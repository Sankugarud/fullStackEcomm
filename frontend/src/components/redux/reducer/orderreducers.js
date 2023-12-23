import { 
    clearError, 
    createOrderRequest, 
    createOrderSuccess,
    myOrderRequest,
    myOrderSuccess,
    myOrderFail,
    allOrderRequest,
    allOrderSuccess,
    allOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFail,
    updateOrderReset,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail,
    deleteOrderReset,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail,
    createOrderFail,
    
  } from "../action/orderActionFunction";
 
  export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case createOrderRequest:
        return {
          ...state,
          loading: true,
        };
  
      case createOrderSuccess:
        return {
          loading: false,
          order: action.payload,
        };
  
      case createOrderFail:
        return {
          loading: false,
          error: action.payload,
        };
  
      case clearError:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
    
      case myOrderRequest:
        return {
          loading: true,
        };
  
      case myOrderSuccess:
        return {
          loading: false,
          order: action.payload,
        };
  
      case myOrderFail:
        return {
          loading: false,
          error: action.payload,
        };
  
      case clearError:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case allOrderRequest:
        return {
          loading: true,
        };
  
      case allOrderSuccess:
        return {
          loading: false,
          orders: action.payload,
        };
  
      case allOrderFail:
        return {
          loading: false,
          error: action.payload,
        };
  
      case clearError:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const orderReducer = (state = {}, action) => {
    switch (action.type) {
      case updateOrderRequest:
      case deleteOrderRequest:
        return {
          ...state,
          loading: true,
        };
  
      case updateOrderSuccess:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case deleteOrderSuccess:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case updateOrderFail:
      case deleteOrderFail:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case updateOrderReset:
        return {
          ...state,
          isUpdated: false,
        };
  
      case deleteOrderReset:
        return {
          ...state,
          isDeleted: false,
        };
  
      case clearError:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
      case orderDetailRequest:
        return {
          loading: true,
        };
  
      case orderDetailSuccess:
        return {
          loading: false,
          order: action.payload,
        };
  
      case orderDetailFail:
        return {
          loading: false,
          error: action.payload,
        };
  
      case clearError:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  