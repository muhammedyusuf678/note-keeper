import { SET_ALERT, REMOVE_ALERT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      //state is immutable
      //state is an array so array destructure
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
