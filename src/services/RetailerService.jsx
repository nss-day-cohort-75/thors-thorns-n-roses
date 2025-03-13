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

/**
 * Fetches detailed retailer data including:
 * - Distributor info
 * - Flowers sold with markup
 * - Nurseries supplying those flowers
 */
export const getRetailerDetails = async () => {
  try {
    const [retailers, distributors, flowers, nurseryFlowers, nurseries] =
      await Promise.all([
        getRetailers(),
        getDistributors(),
        getFlowers(),
        getNurseryFlowers(),
        getNurseries(),
      ]);

    return retailers.map((retailer) => {
      const distributor =
        distributors.find((d) => d.id === retailer.distributorId) || {};

      // Get nurseries supplying this distributor
      const supplierNurseries = nurseryFlowers
        .filter((nf) => nurseries.some((n) => n.id === nf.nurseryId))
        .map((nf) => {
          const flower = flowers.find((f) => f.id === nf.flowerId);
          return flower
            ? {
                ...flower,
                price: nf.price * (1 + retailer.markup),
                nurseryId: nf.nurseryId,
              }
            : null;
        })
        .filter((f) => f);

      const distributorFlowers = supplierNurseries.filter( //Filter FIX for retailer display
        (flower) => flower.nurseryId === distributor.id
      );

      return {
        ...retailer,
        distributor,
        flowers: distributorFlowers,
        nurseries: nurseries.filter((n) =>
          supplierNurseries.some((f) => f.nurseryId === n.id)
        ),
      };
    });
  } catch (error) {
    console.error("Error fetching retailer details", error);
    return [];
  }
};
