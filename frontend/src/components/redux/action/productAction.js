import { PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAIL, error_clear,PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL
} from '../actionTypes/productActionTypes'

//products get all
export const productRequest = () => ({ type: PRODUCT_REQUEST });
export const productSuccess = (data,resultPerPage) => ({ type: PRODUCT_SUCCESS, payload: { data, resultPerPage }  });
export const productFail = (error) => ({ type: PRODUCT_FAIL, payload: error });

//product details each
export const productDetailRequest = () => ({ type: PRODUCT_DETAIL_REQUEST });
export const productDetailSuccess = (data) => ({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
export const productDetailFail = (error) => ({ type:  PRODUCT_DETAIL_FAIL, payload: error });

export const clearError = () => ({ type: error_clear });

