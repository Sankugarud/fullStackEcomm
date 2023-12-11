import {
  productRequest,
  productSuccess,
  productFail,
  clearError,
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
} from "../action/productAction";

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productRequest:
      return { ...state, loading: true, products: [] };

    case productSuccess:
      return { ...state, loading: false, products: action.payload };

    case productFail:
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
