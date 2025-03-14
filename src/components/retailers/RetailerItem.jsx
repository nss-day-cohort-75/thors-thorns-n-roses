import { addToCart } from "../../services/CartService";

export const getCurrentCustomerId = () => {
  const user = JSON.parse(localStorage.getItem("thorn_user")); // getting thorn_user
  return user ? user.customerId : null; //if thorn_user exists, it returns customerId
};
export const RetailerItem = ({ retailer }) => {
  const { name, address, distributor, flowers, nurseryFlowers } = retailer;

  const handleAddToCart = (flowerId) => {
    const customerId = getCurrentCustomerId();
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
            // Look up the flower price in the nursery_flower data
            const flowerData = nurseryFlowers.find(
              (nf) => nf.flowerId === flower.id
            );
            const basePrice = flowerData ? parseFloat(flowerData.price) : 0;
            const distributorPrice = basePrice * (1 + distributor.markup); // Apply distributor markup
            const retailerPrice = distributorPrice * (1 + retailer.markup); // Apply retailer markup on distributor's price

            return (
              <li key={`flower-${flower.id}`}>
                {flower.color} {flower.species} - ${retailerPrice.toFixed(2)}
                <br />
                <strong>Retail Price: ${retailerPrice.toFixed(2)}</strong>
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
