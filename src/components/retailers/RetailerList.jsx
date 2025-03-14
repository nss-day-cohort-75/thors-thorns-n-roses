import React, { useState, useEffect } from "react";
import { getRetailerDetails } from "../../services/RetailerService";
import { RetailerItem } from "./RetailerItem";
import { getNurseryFlowers } from "../../services/FlowerService";

export const RetailerList = () => {
  const [retailers, setRetailers] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const retailerData = await getRetailerDetails();
      const nurseryFlowerData = await getNurseryFlowers();
      setRetailers(retailerData);
      setNurseryFlowers(nurseryFlowerData);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Retailers</h1>
      {retailers.length > 0 ? (
        retailers.map((retailer) => (
          <RetailerItem
            key={`retailer-${retailer.id}`}
            retailer={{ ...retailer, nurseryFlowers }}
          />
        ))
      ) : (
        <p>Loading retailers...</p>
      )}
    </div>
  );
};
