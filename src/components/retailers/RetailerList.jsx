import React, { useState, useEffect } from "react";
import { getRetailerDetails } from "../../services/RetailerService";
import { RetailerItem } from "./RetailerItem";

export const RetailerList = () => {
  const [retailers, setRetailers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const retailerData = await getRetailerDetails();
      setRetailers(retailerData);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Retailers</h1> 
      {retailers.length > 0 ? (
        retailers.map(retailer => <RetailerItem key={`retailer-${retailer.id}`} retailer={retailer} />) 
      ) : (
        <p>Loading retailers...</p>
      )}
    </div>
  );
};
