import {
    productRequest,
    productSuccess,
    productFail,
    clearError,
    productDetailRequest,
    productDetailSuccess,
    productDetailFail,
    adminProductRequest,
    adminProductSuccess,
    adminProductFail,
    newProductFail,
    newProductReset,
    newProductSuccess,
    newProductRequest,
    deleteProductRequest,
    updateProductRequest,
    deleteProductSuccess,
    updateProductSuccess,
    deleteProductFail,
    updateProductFail,
    deleteProductReset,
    updateProductReset,
    allReviewRequest,
    allReviewSuccess,
    allReviewFail,
    newReviewReset,
    newReviewFail,
    newReviewSuccess,
    newReviewRequest,
    deleteReviewSuccess,
    deleteReviewRequest,
    deleteReviewFail,
    deleteReviewReset,
  } from "../action/productActionFunction";
  
  const initialState = {
    products: [],
  };
  
  export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case productRequest:
      case adminProductRequest:
        return { ...state, loading: true, products: [] };
  
      case productSuccess:
        return { ...state, loading: false, products: action.payload };
        case adminProductSuccess:
          return {
            loading: false,
            products: action.payload,
          };
      case productFail:
        case adminProductFail:
        return { ...state, loading: false, error: action.payload };
  
      case clearError:
        return { ...state, error: null };
  
      default:
        return state;
    }
  };
  
  export const productDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case productDetailRequest:
        return { loading: true,...state};
  
      case productDetailSuccess:
        return { loading: false,product: action.payload };
  
      case productDetailFail:
        return { loading: false, error: action.payload };
  
      case clearError:
        return { ...state, error: null };
  
      default:
        return state;
    }
  };
  
  export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case newProductRequest:
        return {
          ...state,
          loading: true,
        };
      case newProductSuccess:
        return {
          loading: false,
          success: action.payload.success,
          product: action.payload.product,
        };
      case newProductReset:
        return {
          ...state,
          success: false,
      
        };
      case newProductFail:
        return {
          ...state,
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
  
  export const productModifyReducer = (state = {}, action) => {
    switch (action.type) {
      case deleteProductRequest:
      case updateProductRequest:
        return {
          ...state,
          loading: true,
        };
      case deleteProductSuccess:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case updateProductSuccess:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case deleteProductFail:
      case updateProductFail:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case deleteProductReset:
        return {
          ...state,
          isDeleted: false,
        };
      case updateProductReset:
        return {
          ...state,
          isUpdated: false,
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
  
  
  //reviesss 
  export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case newReviewRequest:
        return {
          ...state,
          loading: true,
        };
      case newReviewSuccess:
        return {
          loading: false,
          success: action.payload,
        };
      case newReviewFail:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case newReviewReset:
        return {
          ...state,
          success: false,
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
  
  export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case allReviewRequest:
        return {
          ...state,
          loading: true,
        };
      case allReviewSuccess:
        return {
          loading: false,
          reviews: action.payload,
        };
      case allReviewFail:
        return {
          ...state,
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
  
  export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
      case deleteReviewRequest:
        return {
          ...state,
          loading: true,
        };
      case deleteReviewSuccess:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case deleteReviewFail:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case deleteReviewReset:
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