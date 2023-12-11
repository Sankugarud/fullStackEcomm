import axios from "axios";
import { addTocart, removeCartItem } from "./cartAction";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
    const item = {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    };

    const currentCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    localStorage.setItem('cartItems', JSON.stringify([...currentCartItems, item]));

    const updatedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    
    dispatch({ type: addTocart, payload: updatedCartItems });
   
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};


export const fetchDataFromLocalStorage = () => (dispatch) => {
  try {
    const storedData = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Dispatch the stored data to Redux
    dispatch({ type: addTocart, payload: storedData });
  } catch (error) {
    console.error('Error fetching data from local storage:', error);
  }
};

// REMOVE FROM CART
// export const removeItemsFromCart = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: removeCartItem,
//       payload: id,
//     });

//     // Update local storage with the updated cart items
//     localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//   }
// };
// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: removeCartItem,
      payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
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
