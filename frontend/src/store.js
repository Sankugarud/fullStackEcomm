import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productReducer,  productDetailsReducer } from './components/redux/reducer/productReducer';
import { profileReducer, userReducer } from './components/redux/reducer/userReducer';
import { cartReducer } from './components/redux/reducer/cartReducers';

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile:profileReducer,
  cart:cartReducer
});


const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
