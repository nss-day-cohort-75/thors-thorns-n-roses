import React, { useState, useEffect } from "react";
import { getFlowers, getNurseryFlowers } from "../services/FlowerService";
import { getRetailerDetails } from "../services/RetailerService";
import { getCartByCustomerId } from "../services/CartService";

export const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);

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
      getNurseryFlowers().then(setNurseryFlowers);
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

      // Calculate the total cost with markups
      const flowerData = nurseryFlowers.find(
        (nf) => nf.flowerId === flower.id
      );
      const basePrice = flowerData ? parseFloat(flowerData.price) : 0;

      // Check if distributor and retailer exist
      const distributor = retailer.distributor;
      if (!distributor) return;

      const distributorPrice = basePrice * (1 + distributor.markup); // Apply distributor markup
      const retailerPrice = distributorPrice * (1 + retailer.markup); // Apply retailer markup on distributor's price

      const totalCost = retailerPrice * cartItem.quantity;

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

  // Calculate the total quantity and total cost for the cart
  const calculateTotal = () => {
    let totalQuantity = 0;
    let totalCost = 0;

    Object.values(consolidatedItems).forEach(
      ({ quantity, totalCost: cost }) => {
        totalQuantity += quantity;
        totalCost += cost;
      }
    );

    return { totalQuantity, totalCost };
  };

  const { totalQuantity, totalCost } = calculateTotal();

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {Object.keys(consolidatedItems).length > 0 ? (
        <>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Flower</th>
                <th>Quantity</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(consolidatedItems).map(
                ({ flower, quantity, totalCost }) => (
                  <tr key={flower.id}>
                    <td>{`${flower.color} ${flower.species}`}</td>
                    <td>{quantity}</td>
                    <td>${totalCost.toFixed(2)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* Final Row: Total */}
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th>Total</th>
                <th>{totalQuantity}</th>
                <th>${totalCost.toFixed(2)}</th>
              </tr>
            </thead>
          </table>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};
