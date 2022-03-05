import { SHOPS } from "../../data/dummy-data";

const initialState = {
  availableShops: SHOPS,
  userShops: SHOPS.filter((item) => item.id === "s1"),
};

export default (state = initialState, action) => {
  return state;
};
