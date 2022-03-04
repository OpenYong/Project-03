export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_ONE_TO_CART = "ADD_ONE_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";

export const addToCart = (item, quantity) => {
  return { type: ADD_TO_CART, item: item, quantity: quantity };
};

export const addOneToCart = (itemId) => {
  return { type: ADD_ONE_TO_CART, itemId: itemId };
};

export const removeFromCart = (itemId) => {
  return { type: REMOVE_FROM_CART, itemId: itemId };
};

export const removeOneFromCart = (itemId) => {
  return { type: REMOVE_ONE_FROM_CART, itemId: itemId };
};
