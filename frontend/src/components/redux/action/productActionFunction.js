import { PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAIL, error_clear,PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
} from '../actionTypes/productActionTypes'

//products get all
export const productRequest = () => ({ type: PRODUCT_REQUEST });
export const productSuccess = (data,resultPerPage) => ({ type: PRODUCT_SUCCESS, payload: { data, resultPerPage }  });
export const productFail = (error) => ({ type: PRODUCT_FAIL, payload: error });

//product details each
export const productDetailRequest = () => ({ type: PRODUCT_DETAIL_REQUEST });
export const productDetailSuccess = (data) => ({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
export const productDetailFail = (error) => ({ type:  PRODUCT_DETAIL_FAIL, payload: error });


export const adminProductRequest = () => ({ type: ADMIN_PRODUCT_REQUEST });
export const adminProductSuccess = (data, resultPerPage) => ({
  type: ADMIN_PRODUCT_SUCCESS,
  payload: { data, resultPerPage },
});
export const adminProductFail = (error) => ({
  type: ADMIN_PRODUCT_FAIL,
  payload: error,
});

// New product
export const newProductRequest = () => ({ type: NEW_PRODUCT_REQUEST });
export const newProductSuccess = (data, resultPerPage) => ({
  type: NEW_PRODUCT_SUCCESS,
  payload: { data, resultPerPage },
});
export const newProductReset = () => ({ type: NEW_PRODUCT_RESET });
export const newProductFail = (error) => ({ type: NEW_PRODUCT_FAIL, payload: error });

// Update product
export const updateProductRequest = () => ({ type: UPDATE_PRODUCT_REQUEST });
export const updateProductSuccess = (data, resultPerPage) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: { data, resultPerPage },
});
export const updateProductReset = () => ({ type: UPDATE_PRODUCT_RESET });
export const updateProductFail = (error) => ({
  type: UPDATE_PRODUCT_FAIL,
  payload: error,
});

// Delete product
export const deleteProductRequest = () => ({ type: DELETE_PRODUCT_REQUEST });
export const deleteProductSuccess = (data, resultPerPage) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: { data, resultPerPage },
});
export const deleteProductReset = () => ({ type: DELETE_PRODUCT_RESET });
export const deleteProductFail = (error) => ({
  type: DELETE_PRODUCT_FAIL,
  payload: error,
});

// New review
export const newReviewRequest = () => ({ type: NEW_REVIEW_REQUEST });
export const newReviewSuccess = (data, resultPerPage) => ({
  type: NEW_REVIEW_SUCCESS,
  payload: { data, resultPerPage },
});
export const newReviewReset = () => ({ type: NEW_REVIEW_RESET });
export const newReviewFail = (error) => ({ type: NEW_REVIEW_FAIL, payload: error });

// All reviews
export const allReviewRequest = () => ({ type: ALL_REVIEW_REQUEST });
export const allReviewSuccess = (data, resultPerPage) => ({
  type: ALL_REVIEW_SUCCESS,
  payload: { data, resultPerPage },
});
export const allReviewFail = (error) => ({ type: ALL_REVIEW_FAIL, payload: error });

// Delete review
export const deleteReviewRequest = () => ({ type: DELETE_REVIEW_REQUEST });
export const deleteReviewSuccess = (data, resultPerPage) => ({
  type: DELETE_REVIEW_SUCCESS,
  payload: { data, resultPerPage },
});
export const deleteReviewReset = () => ({ type: DELETE_REVIEW_RESET });
export const deleteReviewFail = (error) => ({
  type: DELETE_REVIEW_FAIL,
  payload: error,
});
export const clearError = () => ({ type: error_clear });