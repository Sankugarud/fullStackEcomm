import './App.css';
import Navbar from './components/layout/header/Navbar';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './components/user/login&signUp/Login&SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './components/redux/action/usercalled';
import UserOptions from './components/layout/header/UserOptions';
import ProductDetails from './components/productDetails/ProductDetails';
import { useEffect } from 'react';
import UserProfile from './components/user/userprofile/UserProfile';
import UpdateProfile from './components/user/profileUpdate/UpdateProfile';
import UpdatePassword from './components/user/passwordUpdate/UpdatePassword'
import ForgetPassword from './components/user/forgetPassword/ForgetPassword'
import ResetPassword from './components/user/resetpassword/ResetPassword';
import { fetchDataFromLocalStorage } from './components/redux/action/getCarts';
import CartComponent from './components/cart/cartComponent/CartComponent';
function App() {
  const dispatch = useDispatch();

  const { authenticated, user } = useSelector((state) => state.user);
 
  useEffect(() => {
    dispatch(fetchDataFromLocalStorage())
    dispatch(loadUser());
  }, [dispatch]); 
  
  return (
    <div className="App">
        <Navbar/> 
        {authenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/update-profile" element={<UpdateProfile/>}/>
        <Route exact path="/change-password" element={<UpdatePassword/>}/>
        <Route exact path="/forget-password" element={<ForgetPassword/>}/>
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>

        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route exact path='/products' element={<Home/>}/>
        <Route exact path="/products/:keyword" element={<Home/>} />
        <Route exact path='/cart' element={<CartComponent/>}/>
        {authenticated ?  <Route exact path='/products' element={<Home/>}/> : <Route path="/signin" element={<Register />} />}
          <Route  path="/profile" element={<UserProfile />} />
       
      </Routes>
      
     </div>
  );
}

export default App;
