
import axios from "axios";
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  myOrderRequest,
  myOrderSuccess,
  myOrderFail,
  allOrderRequest,
  allOrderSuccess,
  allOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
  clearError,
} from "./orderActionFunction";

const jwtToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, '$1');
const config= {
  withCredentials: true,
  headers: {
      Authorization: `Bearer ${jwtToken}`,
  },
}


// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post("https://backend-4kbe.onrender.com/api/v1/order/new", order, config);

    dispatch(createOrderSuccess(data));
  } catch (error) {
    console.log(error)
    dispatch(createOrderFail(error.response.data.message));
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({type:myOrderRequest});
    const { data } = await axios.get("https://backend-4kbe.onrender.com/api/v1/orders/user",config);
    dispatch({type:myOrderSuccess, payload:data.order});
  } catch (error) {
    console.log(error)
    dispatch({type:myOrderFail, payload:error.response.data.message});
  }
}; 

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({type:allOrderRequest});

    const { data } = await axios.get("https://backend-4kbe.onrender.com/api/v1/admin/orders",config);
    dispatch({type:allOrderSuccess,payload:data.order});
  } catch (error) {
    dispatch({type:allOrderFail,payload:error.response.data.message});
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `https://backend-4kbe.onrender.com/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch(updateOrderSuccess(data.success));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());

    const { data } = await axios.delete(`https://backend-4kbe.onrender.com/api/v1/admin/order/${id}`,config);

    dispatch(deleteOrderSuccess(data.success));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({type:orderDetailRequest});

    const { data } = await axios.get(`https://backend-4kbe.onrender.com/api/v1/order/${id}`,config);

    dispatch({type:orderDetailSuccess,payload:data.order});
  } catch (error) {
    dispatch({type:orderDetailFail,payload:error.response.data.message});
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(clearError());
};
