import React, { useEffect, useState } from "react";
import { addToCart, getCartByCustomerId } from "../../services/CartService";

export const getCurrentCustomerId = () => {
  const user = JSON.parse(localStorage.getItem("thorn_user")); // getting thorn_user
  return user ? user.customerId : null;
};
export const RetailerItem = ({ retailer }) => {
  const { name, address, distributor, flowers } = retailer;

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
          {flowers.map((flower) => {
            // Calculate the price with the distributor's markup
            const distributorPrice = parseFloat(flower.price) * (1 + distributor.markup);
            console.log(`Distributor Price: ${distributorPrice}`);

            return (
              <li key={`flower-${flower.id}`}>
                {flower.color} {flower.species} - ${distributorPrice.toFixed(2)}
                <button
                  onClick={() => {
                    handleAddToCart(flower.id);
                  }}
                >
                  Add To Cart
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No flowers available</p>
      )}

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
