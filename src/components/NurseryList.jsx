import { getNurseries } from "../services/NurseryService";
import { getFlowers, getNurseryFlowers } from "../services/FlowerService";
import React, { useState, useEffect } from "react";

export const NurseryList = () => {
  const [nurseries, setNurseries] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);
//  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const nurseriesData = await getNurseries();
      const flowersData = await getFlowers();
      const nurseryFlowerData = await getNurseryFlowers();
    //  const distributorsData = await getDistributors();

      setNurseries(nurseriesData);
      setFlowers(flowersData);
      setNurseryFlowers(nurseryFlowerData);
  //    setDistributors(distributorsData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Nurseries</h2>
      <ol>
        {nurseries.map((nursery) => {
          const flowersInNursery = nurseryFlowers
            .filter((nurseryFlower) => nurseryFlower.nurseryId === nursery.id)
            .map((nurseryFlower) => {
              const flower = flowers.find(
                (flower) => flower.id === nurseryFlower.flowerId
              );
              return flower ? { ...flower, price: nurseryFlower.price } : null;
            });
          return (
            <li key={nursery.id}>
            <div>
              <h3>{nursery.name}</h3>
              <h4>Flowers Being Grown:</h4>
              <ul>
                {flowersInNursery.length > 0 ? (
                  flowersInNursery.map((flower) => (
                    <li key={flower.id}>
                      {flower.color} {flower.species} - ${flower.price.toFixed(2)}
                    </li>
                  ))
                ) : (
                  <li>No flowers available</li>
                )}
              </ul>
            </div>
          </li>
          );
        })}
      </ol>
    </div>
  );
};
