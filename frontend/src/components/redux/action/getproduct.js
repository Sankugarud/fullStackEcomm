import { productRequest,
    productSuccess,
    productFail,
    productDetailRequest,
    productDetailSuccess,
    productDetailFail,
    adminProductRequest,
    adminProductSuccess,
    adminProductFail,
    newProductRequest,
    newProductSuccess,
    newProductFail,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    newReviewRequest,
    newReviewSuccess,
    newReviewFail,
    allReviewRequest,
    allReviewSuccess,
    allReviewFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    clearError} from "./productActionFunction";
  import axios from 'axios'
  
  const jwtToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const config= {
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${jwtToken}`,
    },
  }
  
  
  export const getproduct = (keyword="",currentPage = 1,price=[0,25000],category, ratings = 0) => async (dispatch) => {
     let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
  
     if (category) {
      const lowercaseCategory = category.toLowerCase();
      if(category === 'All'){
          link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
      }else{
          link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${lowercaseCategory}&ratings[gte]=${ratings}`;
  
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
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch({ type: productDetailSuccess, payload: data });
      } catch (error) {
        dispatch({
          type: productDetailFail,
          payload: error.response.data.error,
        });
      }
    };
    export const getAdminProduct = () => async (dispatch) => {
      try {
        dispatch({ type: adminProductRequest });
    
        const { data } = await axios.get("/api/v1/admin/products",config);
        dispatch({
          type: adminProductSuccess,
          payload: data.products,
        });
      } catch (error) {
        dispatch({
          type: adminProductFail,
          payload: error.response.data.message,
        });
      }
    };
    
    // Create Product
    export const createProduct = (productData) => async (dispatch) => {
      try {
        dispatch({ type: newProductRequest });
    
  
        const { data } = await axios.post(
          `/api/v1/admin/product/new`,
          productData,
          config
        );
    
        dispatch({
          type: newProductSuccess,
          payload: data,
        });
      } catch (error) {
        console.log(error)
        dispatch({
          type: newProductFail,
          payload: error.response.data.message,
        });
      }
    };
    
    // Update Product
    export const updateProduct = (id, productData) => async (dispatch) => {
      try {
        console.log(id)
        dispatch({ type: updateProductRequest });
    
      
        const { data } = await axios.put(
          `/api/v1/admin/product/${id}`,
          productData,
          config
        );
    
        dispatch({
          type: updateProductSuccess,
          payload: data.success,
        });
      } catch (error) {
        dispatch({
          type: updateProductFail,
          payload: error.response.data.message,
        });
      }
    };
    
    // Delete Product
    export const deleteProduct = (id) => async (dispatch) => {
      try {
        dispatch({ type: deleteProductRequest });
    
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`,config);
    
        dispatch({
          type: deleteProductSuccess,
          payload: data.success,
        });
      } catch (error) {
        dispatch({
          type: deleteProductFail,
          payload: error.response.data.message,
        });
      }
    };
    
  
    // NEW REVIEW
    export const newReview = (reviewData) => async (dispatch) => {
      try {
        dispatch({ type: newReviewRequest });
          console.log(reviewData)
      
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    
        dispatch({
          type: newReviewSuccess,
          payload: data.success,
        });
      } catch (error) {
        console.log(error)
        dispatch({
          type: newReviewFail,
          payload: error.response.data.message,
        });
      }
    };
    
    // Get All Reviews of a Product
    export const getAllReviews = (id) => async (dispatch) => {
      try {
        dispatch({ type: allReviewRequest });
    
        const { data } = await axios.get(`/api/v1/review?id=${id}`,config);
        dispatch({
          type: allReviewSuccess,
          payload: data.reviews,
        });
      } catch (error) {
        dispatch({
          type: allReviewFail,
          payload: error.response.data.message,
        });
      }
    };
    
    // Delete Review of a Product
    export const deleteReviews = (reviewId, productId) => async (dispatch) => {
      try {
        dispatch({ type: deleteReviewRequest });
    
        const { data } = await axios.delete(
          `/api/v1/review?id=${reviewId}&productId=${productId}`,config
        );
    
        dispatch({
          type: deleteReviewSuccess,
          payload: data.success,
        });
      } catch (error) {
        dispatch({
          type: deleteReviewFail,
          payload: error.response.data.message,
        });
      }
    };
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: clearError });
  };