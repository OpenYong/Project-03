import {
  ADD_TO_CART,
  ADD_ONE_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedItem = action.item;
      const itemPrice = addedItem.price;
      const itemTitle = addedItem.title;

      let updatedOrNewCartItem;

      if (state.items[addedItem.id]) {
        // 이미 카트에 아이템이 추가되어있는경우
        updatedOrNewCartItem = new CartItem(
          state.items[addedItem.id].quantity + action.quantity,
          itemPrice,
          itemTitle,
          state.items[addedItem.id].sum + itemPrice * action.quantity
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          action.quantity,
          itemPrice,
          itemTitle,
          itemPrice * action.quantity
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedItem.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + itemPrice * action.quantity,
      };

    case ADD_ONE_TO_CART:
      let updatedCartItems = { ...state.items };
      let selectedItem = updatedCartItems[action.itemId];
      updatedCartItems = new CartItem(
        selectedItem.quantity + 1,
        selectedItem.itemPrice,
        selectedItem.itemTitle,
        selectedItem.sum + selectedItem.itemPrice
      );
      return {
        ...state,
        items: {
          ...state.items,
          [action.itemId]: updatedCartItems,
        },
        totalAmount: state.totalAmount + selectedItem.itemPrice,
      };

    case REMOVE_FROM_CART:
      updatedCartItems = { ...state.items };
      selectedItem = updatedCartItems[action.itemId];
      const selectedItemSum = selectedItem.sum;
      delete updatedCartItems[action.itemId];
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItemSum,
      };

    case REMOVE_ONE_FROM_CART:
      updatedCartItems = { ...state.items };
      selectedItem = updatedCartItems[action.itemId];

      if (selectedItem.quantity > 1) {
        updatedCartItems = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.itemPrice,
          selectedItem.itemTitle,
          selectedItem.sum - selectedItem.itemPrice
        );
        return {
          ...state,
          items: {
            ...state.items,
            [action.itemId]: updatedCartItems,
          },
          totalAmount: state.totalAmount - selectedItem.itemPrice,
        };
      } else {
        delete updatedCartItems[action.itemId];
        return {
          ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - selectedItem.itemPrice,
        };
      }

    case ADD_ORDER:
      return initialState;
  }
  return state;
};
