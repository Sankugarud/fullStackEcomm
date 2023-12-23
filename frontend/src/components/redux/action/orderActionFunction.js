import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
  } from "../actionTypes/orderActionTypes";
  
export const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
export const createOrderSuccess = (data,resultPerPage) => ({ type: CREATE_ORDER_SUCCESS, payload: { data, resultPerPage }  });
export const createOrderFail = (error) => ({ type: CREATE_ORDER_FAIL, payload: error });

export const myOrderRequest = () => ({ type: MY_ORDERS_REQUEST });
export const myOrderSuccess = (data,resultPerPage) => ({ type: MY_ORDERS_SUCCESS, payload: { data, resultPerPage }  });
export const myOrderFail = (error) => ({ type: MY_ORDERS_FAIL, payload: error });

export const updateOrderRequest = () => ({ type: UPDATE_ORDER_REQUEST });
export const updateOrderSuccess = (data,resultPerPage) => ({ type: UPDATE_ORDER_SUCCESS, payload: { data, resultPerPage }  });
export const updateOrderReset = (data,resultPerPage) => ({ type: UPDATE_ORDER_RESET, payload: { data, resultPerPage }  });
export const updateOrderFail = (error) => ({ type: UPDATE_ORDER_FAIL, payload: error });

export const deleteOrderRequest = () => ({ type: DELETE_ORDER_REQUEST });
export const deleteOrderSuccess = (data,resultPerPage) => ({ type: DELETE_ORDER_SUCCESS, payload: { data, resultPerPage }  });
export const deleteOrderReset = (data,resultPerPage) => ({ type: DELETE_ORDER_RESET, payload: { data, resultPerPage }  });
export const deleteOrderFail = (error) => ({ type: DELETE_ORDER_FAIL, payload: error });


export const allOrderRequest = () => ({ type: ALL_ORDERS_REQUEST });
export const allOrderSuccess = (data,resultPerPage) => ({ type: ALL_ORDERS_SUCCESS, payload: { data, resultPerPage }  });
export const allOrderFail = (error) => ({ type: ALL_ORDERS_FAIL, payload: error });


export const orderDetailRequest = () => ({ type: ORDER_DETAILS_REQUEST });
export const orderDetailSuccess = (data,resultPerPage) => ({ type: ORDER_DETAILS_SUCCESS, payload: { data, resultPerPage }  });
export const orderDetailFail = (error) => ({ type: ORDER_DETAILS_FAIL, payload: error });

export const clearError = () => ({ type: CLEAR_ERRORS });
