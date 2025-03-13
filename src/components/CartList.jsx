import React, { useState, useEffect } from "react";
import { getCartByCustomerId } from "../services/CartService";
import { getFlowers } from "../services/FlowerService";
import { getRetailerDetails } from "../services/RetailerService";

export const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [retailers, setRetailers] = useState([]);

  const getCurrentCustomerId = () => {
    const user = JSON.parse(localStorage.getItem("thorn_user"));
    return user ? user.customerId : null;
  };

  // Fetch the cart items for the logged-in user, flower details, and retailer data
  useEffect(() => {
    const customerId = getCurrentCustomerId();
    if (customerId) {
      getCartByCustomerId(customerId).then(setCartItems);
      getFlowers().then(setFlowers);
      getRetailerDetails().then(setRetailers);
    }
  }, []);

  // Consolidate flowers in the cart by their ID and calculate the total quantity and cost
  const consolidateCartItems = () => {
    const consolidatedItems = {};

    cartItems.forEach((cartItem) => {
      const flower = flowers.find((flower) => flower.id === cartItem.flowerId);
      if (!flower) return;

      const retailer = retailers.find((retailer) =>
        retailer.flowers.some((flowerObj) => flowerObj.id === cartItem.flowerId)
      );

      if (!retailer) return;

      const retailerFlower = retailer.flowers.find(
        (f) => f.id === cartItem.flowerId
      );
      if (!retailerFlower) return;

      // Calculate the total cost with markup
      const totalCost =
        retailerFlower.price * (1 + retailer.markup) * cartItem.quantity;

      if (consolidatedItems[flower.id]) {
        consolidatedItems[flower.id].quantity += cartItem.quantity;
        consolidatedItems[flower.id].totalCost += totalCost;
      } else {
        consolidatedItems[flower.id] = {
          flower,
          quantity: cartItem.quantity,
          totalCost,
        };
      }
    });

    return consolidatedItems;
  };

  const consolidatedItems = consolidateCartItems();

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {Object.keys(consolidatedItems).length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Flower</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(consolidatedItems).map(({ flower, quantity, totalCost }) => (
              <tr key={flower.id}>
                <td>{`${flower.color} ${flower.species}`}</td>
                <td>{quantity}</td>
                <td>${totalCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};
