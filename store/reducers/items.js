import { ITEMS } from "../../data/dummy-data";

const initialState = {
  availableItems: ITEMS,
  // userItems: ITEMS.filter((item) => item.shopId === "s1"),
};

export default (state = initialState, action) => {
  return state;
};
