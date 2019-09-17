import { ADD_TO_CART, removeFromCart, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDERS } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";
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
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;

      let updatedCartItems;

      if (currentQty > 1) {
        // reduce it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
    case ADD_ORDERS:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      delete updatedItems[action.pid];
      const itemTotal = state.items[action.pid].sum;
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      };
  }

  return state;
};
