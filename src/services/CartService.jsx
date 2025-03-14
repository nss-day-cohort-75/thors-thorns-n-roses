export const addToCart = (customerId, flowerId, quantity) => {
  return fetch(`http://localhost:8088/shopping_cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId: customerId,
      flowerId: flowerId,
      quantity: quantity,
    }),
  }).then((res) => res.json());
};

export const getCartByCustomerId = (customerId) => {
  return fetch(
    `http://localhost:8088/shopping_cart?customerId=${customerId}`
  ).then((res) => res.json());
};
