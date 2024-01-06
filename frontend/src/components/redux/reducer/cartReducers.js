// cartReducer.js

import { addTocart, clearcartitem, removeCartItem, saveShippingInfo } from "../action/cartAction";

const initialState = {
  cartItems: [],
  shippingInfo: {},
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case addTocart:
      const item = action.payload;
   
      const isItemExist = state.cartItems.find((i) => i.product === item.product);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
         
        };
      }

    case removeCartItem:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
      case clearcartitem:
        return{
          ...state,
          cartItems: [], 
        }
    case saveShippingInfo:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};