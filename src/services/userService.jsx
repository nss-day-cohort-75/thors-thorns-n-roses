export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/customers?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (customer) => {
  return fetch("http://localhost:8088/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json());
};

export const createShoppingCart = (cartData) => {
  return fetch("http://localhost:8088/shopping_cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  }).then((res) => res.json());
};