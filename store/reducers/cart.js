import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addProduct = action.product;
      const productPrice = addProduct.price;
      const productTitle = addProduct.title;
      items = state.items;
      if (items[addProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addProduct.id].sum + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + productPrice
        };
      } else {
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice
        };
      }
  }
  return state;
};
