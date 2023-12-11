import { productRequest,productSuccess,productFail, productDetailRequest, productDetailSuccess, productDetailFail, clearError } from "./productAction";
import axios from 'axios'


export const getproduct = (keyword="",currentPage = 1,price=[0,25000],category, ratings = 0) => async (dispatch) => {
   let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

   if (category) {
    const lowercaseCategory = category.toLowerCase();
    if(category === 'All'){
        link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    }else{
        link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${lowercaseCategory}&ratings[gte]=${ratings}`;

    }
  }
    try {
        dispatch({type:productRequest})
        const {data } = await axios.get(link)
        dispatch({type:productSuccess,
            payload:data 
        });


    } catch (error) {
        dispatch({
            type:productFail,
            payload:error.response
        })
    }
}
export const productDetails = (id) => async (dispatch) => {
    try {
            dispatch({ type: productDetailRequest });
      const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
      dispatch({ type: productDetailSuccess, payload: data });
    } catch (error) {
      dispatch({
        type: productDetailFail,
        payload: error.response.data.error,
      });
    }
  };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: clearError });
};