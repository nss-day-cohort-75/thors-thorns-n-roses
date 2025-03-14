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
  }).then((res) => res.json())
  
.then((newCartItem) => {
  // Update localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(newCartItem);
  localStorage.setItem("cart", JSON.stringify(cart));

  // Notify NavBar to update the cart count
  window.dispatchEvent(new Event("storage"));
});
};


export const getCartByCustomerId = (customerId) => {
  return fetch(
    `http://localhost:8088/shopping_cart?customerId=${customerId}`
  ).then((res) => res.json());
};


export const clearCartByCustomerId = (customerId) => {
  return fetch(`http://localhost:8088/shopping_cart?customerId=${customerId}`)
    .then(res => res.json())
    .then(cartItems => {
      // JSON Server does not support bulk delete, so delete each item individually
      const deletePromises = cartItems.map(item =>
        fetch(`http://localhost:8088/shopping_cart/${item.id}`, { method: "DELETE" })
      );  return Promise.all(deletePromises);
    });
};

