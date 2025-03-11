import { getNurseries } from "../services/NurseryService";
import { getFlowers, getNurseryFlowers } from "../services/FlowerService";
import React, { useState, useEffect } from "react";
import { getDistributors, getNurseryDistributors } from "../services/DistributorService";

export const NurseryList = () => {
  const [nurseries, setNurseries] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [nurseryFlowers, setNurseryFlowers] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [ nurseryDistributors, setNurseryDistributors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const nurseriesData = await getNurseries();
      const flowersData = await getFlowers();
      const nurseryFlowerData = await getNurseryFlowers();
      const distributorsData = await getDistributors();
      const nurseryDistributorData = await getNurseryDistributors ();

      setNurseries(nurseriesData);
      setFlowers(flowersData);
      setNurseryFlowers(nurseryFlowerData);
      setDistributors(distributorsData);
      setNurseryDistributors(nurseryDistributorData);
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
            //Distributors 
            const distributorsForNursery = nurseryDistributors.filter((nurseryDistributors)=> nurseryDistributors.nurseryId === nursery.id)
            .map((nurseryDistributors) => distributors.find((distributors) => distributors.id === nurseryDistributors.distributorId))
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
              <h4> Distributors:</h4>
              <ul>
              {distributorsForNursery.length > 0 ? (
                    distributorsForNursery.map((distributor) => (
                      <li key={distributor.id}>{distributor.name} (Markup: {distributor.markup * 100}%)</li>
                    ))
                  ) : (
                    <li>No distributors available</li>
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
