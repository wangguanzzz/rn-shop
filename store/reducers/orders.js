import * as orderActions from "../actions/orders";
import Order from "../../models/orders";
const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case orderActions.ADD_ORDERS:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return { ...state, orders: state.orders.concat(newOrder) };
  }
  return state;
};


