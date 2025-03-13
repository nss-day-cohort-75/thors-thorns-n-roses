import { getCurrentCustomerId } from "../components/retailers/RetailerItem";

// Handle the checkout by posting the current cart items
export const checkoutCart = (cartItems) => {
  return fetch("http://localhost:8088/shopping_cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItems),
  }).then((res) => res.json());
};

// export const addToCart = (flowerItem) => {
//     let customerId = getCurrentCustomerId();

//   return fetch(`http://localhost:8088/shopping_cart?_expand=${customerId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(flowerItem),
//   }).then((res) => res.json());
// };

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