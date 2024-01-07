import axios from "axios";
import { addTocart, removeCartItem, saveShippingInfo } from "./cartAction";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`https://backend-0xvl.onrender.com/api/v1/product/${id}`);
    
    const flattenedItem = {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    };

    dispatch({
      type: addTocart,
      payload: flattenedItem,
    });

    const updatedCart = getState().cart; // Get the entire cart state
    localStorage.setItem("cartItems", JSON.stringify(updatedCart.cartItems));
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

// removeItemsFromCart action
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: removeCartItem,
      payload: id,
    });

    const updatedCartItems = getState().cart.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};
// SAVE SHIPPING INFO
export const ShippingInfo = (data) => async (dispatch) => {
  try {
    dispatch({
      type: saveShippingInfo,
      payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving shipping info:", error);
  }
};