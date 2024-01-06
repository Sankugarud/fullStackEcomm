import { ADD_TO_CART, INIT_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../actionTypes/cartActionTypes";

export const addTocart = (item) => ({type: ADD_TO_CART, payload:item});

export const removeCartItem = (itemId) => ({type: REMOVE_CART_ITEM,payload: itemId})

export const clearcartitem = () => ({type:INIT_CART})

export const saveShippingInfo = (shippingInfo) => ({type: SAVE_SHIPPING_INFO,payload: shippingInfo});