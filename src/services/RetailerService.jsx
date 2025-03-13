import { getDistributors } from "./DistributorService";
import { getFlowers, getNurseryFlowers } from "./FlowerService";
import { getNurseries } from "./NurseryService";

/**
 * Fetches all retailers from the API.
 */
export const getRetailers = async () => {
    try {
        const response = await fetch("http://localhost:8088/retailers");
        if (!response.ok) throw new Error("Failed to fetch retailers");
        return await response.json();
    } catch (error) { 
        console.error("Error fetching retailers", error);
        return [];
    }
};


export const getData = async () => {
    try {
      const response = await fetch('http://localhost:8088/database');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return {};
    }
  };
/**
 * Fetches detailed retailer data including:
 * - Distributor info
 * - Flowers sold with markup
 * - Nurseries supplying those flowers
 */

export const getDistributorNurseries = () => {
    return fetch("http://localhost:8088/distributor_nursery")
      .then(res => res.json());
  };
  
  export const getRetailerDetails = async () => {
    try {
      const [
        retailers,
        distributors,
        flowers,
        nurseryFlowers,
        nurseries,
        distributorNurseries // Now properly fetched
      ] = await Promise.all([
        getRetailers(),
        getDistributors(),
        getFlowers(),
        getNurseryFlowers(),
        getNurseries(),
        getDistributorNurseries() // Now defined
      ]);
  
      // Create lookup maps
      const distributorMap = new Map(distributors.map(d => [d.id, d]));
      const flowerMap = new Map(flowers.map(f => [f.id, f]));
      
      // Create distributor -> nurseries mapping
      const distributorNurseryMap = new Map();
      distributorNurseries.forEach(({ distributorId, nurseryId }) => {
        if (!distributorNurseryMap.has(distributorId)) {
          distributorNurseryMap.set(distributorId, []);
        }
        distributorNurseryMap.get(distributorId).push(nurseryId);
      });
  
      return retailers.map(retailer => {
        const distributor = distributorMap.get(retailer.distributorId) || null;
        const supplierNurseryIds = distributorNurseryMap.get(retailer.distributorId) || [];
  
        const supplierNurseries = nurseries.filter(n => 
          supplierNurseryIds.includes(n.id)
        );
  
        const supplierFlowers = nurseryFlowers
          .filter(nf => supplierNurseryIds.includes(nf.nurseryId))
          .map(nf => ({
            ...flowerMap.get(nf.flowerId),
            price: nf.price * (1 + retailer.markup),
            nurseryId: nf.nurseryId
          }))
          .filter(f => f.species); // Remove undefined flowers
  
        return {
          ...retailer,
          distributor,
          flowers: supplierFlowers,
          nurseries: supplierNurseries
        };
      });
    } catch (error) {
      console.error("Error fetching retailer details", error);
      return [];
    }
  };