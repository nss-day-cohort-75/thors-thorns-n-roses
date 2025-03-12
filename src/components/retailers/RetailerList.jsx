// src\components\retailers\RetailerList.jsx
import React, { useState, useEffect } from "react";
import { getRetailerDetails } from "../../services/RetailerService";
import RetailerItem from "./RetailerItem";

export const RetailerList = () => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retailerData = await getRetailerDetails();
        setRetailers(retailerData);
      } catch (error) {
        console.error("Error fetching retailer details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading retailers...</p>;

  return (
    <div>
      <h2>Retailers</h2>
      {retailers.length > 0 ? (
        retailers.map((retailer) => (
          <RetailerItem key={retailer.id} retailer={retailer} />
        ))
      ) : (
        <p>No retailers available.</p>
      )}
    </div>
  );
};
