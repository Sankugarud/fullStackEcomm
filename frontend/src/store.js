import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {productReducer,  productDetailsReducer, newProductReducer, productModifyReducer, newReviewReducer, productReviewsReducer, reviewReducer } from './components/redux/reducer/productReducer';
import { RegisterReducer, allUsersReducer, forgotPasswordReducer, loginReducer, profileReducer, userDetailsReducer, userReducer } from './components/redux/reducer/userReducer';
import { cartReducer } from './components/redux/reducer/cartReducers';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './components/redux/reducer/orderreducers';

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct:newProductReducer,
  productModify:productModifyReducer,
  newReview:newReviewReducer,
  productReviews:productReviewsReducer,
  review:reviewReducer,
  user: userReducer,
  login:loginReducer,
  register:RegisterReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  allOrders:allOrdersReducer,
  order:orderReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;