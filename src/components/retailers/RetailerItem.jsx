// src\components\retailers\RetailerItem.jsx
import React from "react";

export const RetailerItem = ({ retailer }) => {
  const { name, address, distributor, flowers, nurseries } = retailer;

  return (
    <div className="retailer-card">
      <h3>{name}</h3>
      <p><strong>Address:</strong> {address}</p>

      <h4>Flowers Sold:</h4>
      {flowers.length > 0 ? (
        <ul>
          {flowers.map((flower) => (
            <li key={flower.id}>
              {flower.color} {flower.species} - ${flower.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No flowers available</p>
      )}

      <h4>Distributor:</h4>
      <p>{distributor?.name || "Unknown"}</p>

      <h4>Nurseries Supplying Flowers:</h4>
      {nurseries.length > 0 ? (
        <ul>
          {nurseries.map((nursery) => (
            <li key={nursery.id}>{nursery.name}</li>
          ))}
        </ul>
      ) : (
        <p>No nurseries available</p>
      )}
    </div>
  );
};

