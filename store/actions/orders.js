export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount, shopName) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount, shopName },
  };
};
