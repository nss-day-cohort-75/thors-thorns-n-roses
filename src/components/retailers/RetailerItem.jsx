import React, { useEffect, useState } from "react";
import { addToCart, getCartByCustomerId } from "../../services/CartService";

export const getCurrentCustomerId = () => {
  const user = JSON.parse(localStorage.getItem("thorn_user")); // getting thorn_user
  return user ? user.customerId : null;
};
export const RetailerItem = ({ retailer }) => {
  const { name, address, distributor, flowers, nurseries } = retailer;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const customerId = getCurrentCustomerId();
    if (customerId) {
      getCartByCustomerId(customerId).then(setCartItems); // Fetch the cart when the component mounts
    }
  }, []); // Empty dependency array to only run once on mount
  // Define customerId from localStorage

  const handleAddToCart = (flowerId) => {
    const customerId = getCurrentCustomerId();
    console.log("Customer ID: ", customerId);
    if (!customerId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    addToCart(customerId, flowerId, 1).then(() => {
      alert("Added to Cart");
    });
  };

  return (
    <div className="retailer-card">
      <h3>{name}</h3>
      <p>
        <strong>Address:</strong> {address}
      </p>

      <h4>Flowers Sold:</h4>
      {flowers.length > 0 ? (
        <ul>
          {flowers.map((flower, index) => (
            <li key={`flower-${flower.id}-${index}`}>
              {flower.color} {flower.species} - ${flower.price.toFixed(2)}
              <button
                onClick={() => {
                  handleAddToCart(flower.id);
                }}
              >
                Add To Cart
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No flowers available</p>
      )}

      {/* <h4>Distributor:</h4>
      <p>{distributor?.name || "Unknown"}</p>

      <h4>Nurseries Supplying Flowers:</h4>
      {retailer.nurseries.length > 0 ? (
        <ul>
          {retailer.nurseries.map((nursery, index) => (
            <li key={`nursery-${nursery.id}-${index}`}>{nursery.name}</li>
          ))}
        </ul>
      ) : (
        <p>No nurseries available</p>
      )}
    </div>
  );
}; */}
      <h4>Distributor:</h4>
      <p>{distributor?.name || "Unknown"}</p>

      <h4>Nurseries Supplying Flowers:</h4>
      {/* Display nurseries supplying the retailer's flowers */}
      <ul>
        {retailer.nurseries.length > 0 ? (
          retailer.nurseries.map((nursery) => (
            <li key={nursery.id}>{nursery.name}</li>
          ))
        ) : (
          <p>No nurseries available</p>
        )}
      </ul>
    </div>
  );
};
