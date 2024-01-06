import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Layout/header/Navbar';
import Products from './components/Products/Products/Products';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './components/redux/action/usercalled';
import ProductDetails from './components/Products/productDetails/ProductDetails';
import UserProfile from './components/user/userprofile/UserProfile';
import UpdateProfile from './components/user/profileUpdate/UpdateProfile';
import UpdatePassword from './components/user/passwordUpdate/UpdatePassword';
import ForgetPassword from './components/user/forgetPassword/ForgetPassword';
import ResetPassword from './components/user/resetpassword/ResetPassword';
import CartComponent from './components/cart/CartComponent/CartComponents';
import Shipping from './components/cart/Shipping/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder/ConfirmOrder';
import Payment from './components/cart/Payment/Payment'
import MyOrders from './components/Orders/myOrder/MyOrder';
import OrderDetails from './components/Orders/orderDetails/OrderDetails';
import NewProduct from './components/Admin/NewProduct/NewProduct';
import Dashboard from './components/Admin/DashBoard/DashBoard';
import OrderList from './components/Admin/OrderList/OrderList';
import ProductList from './components/Admin/ProductList/ProductList';
import UpdateProduct from './components/Admin/UpdateProduct/UpdateProduct';
import ProcessOrder from './components/Admin/ProcessOrder/ProcessOrder';
import UserList from './components/Admin/UserList/UserList';
import UpdateUser from './components/Admin/UpdateUser/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews/ProductReviews';
import Home from './components/Home/Home';
import FooterPage from './components/Layout/Footer/FooterPage'
import SwitchTabs from './components/user/login&signUp/SwitchTabs';
import Contact from "./components/Layout/Contact/Contact";
import About from "./components/Layout/About/About";
import NotFound from "./components/Layout/NotFound/NotFound";
function App() {
  const dispatch = useDispatch();

  const { user,authenticated } = useSelector((state) => state.user);

  
  useEffect(() => {
        dispatch(loadUser());

  }, [dispatch]);

  

  return (
    <div className="App">
       
        <Navbar />
    

       <Routes>
       <Route path="/" element={<Home />} />
    
         <Route path="/update-profile" element={<UpdateProfile />} />
         <Route path="/change-password" element={<UpdatePassword />} />
         <Route path="/forget-password" element={<ForgetPassword />} />
         <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductDetails />} />
    
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        
         <Route path="/cart" element={<CartComponent />} />
         {authenticated && (
           <Route path="/shipping" element={<Shipping />} />
         )}
         <Route path="/shipping" element={<Shipping />} />
         <Route path="/order/confirm" element={<ConfirmOrder />} />
         <Route path='/process/payment' element={<Payment />}/>
         <Route  path="/contact" element={<Contact/>} />
         <Route path="/about" element={<About/>} /> 
         <Route  path="/*" element={<NotFound/>} />

 
         {/* admin */}
        {authenticated && user && (
          <>
           {user.role==='admin' ? (
             <>
              <Route exact path="/admin/product" element={<NewProduct/>}/>
              <Route exact path="/admin/dashboard" element={<Dashboard/>}/>
              <Route exact path="/admin/orders" element={<OrderList/>}/>
             <Route exact path="/admin/products" element={<ProductList/>}/>
             <Route exact path="/admin/product/:id" element={<UpdateProduct/>}/>
              <Route exact path="/admin/order/:id" element={<ProcessOrder/>}/>
              <Route exact path="/admin/users" element={<UserList/>}/>
              <Route exact path="/admin/user/:id" element={<UpdateUser/>}/>
              <Route exact path="/admin/reviews" element={<ProductReviews/>}/>
              </>
               )   : (
                 <Route  path="/*" element={<NotFound/>} />
               )}
               </>
         ) } 
       

       
        
        
         {/* orders */}
          <Route path='/orders' element={< MyOrders />}/>
         <Route path='/order/:id' element={< OrderDetails/>}/>
               {authenticated ? <Route path="/products" element={<Products />} /> : <Route path="/signin" element={<SwitchTabs />} />}
        
               <Route path="/profile" element={<UserProfile />} />  
       </Routes>
         <FooterPage/>
      </div>
    )
}

export default App;