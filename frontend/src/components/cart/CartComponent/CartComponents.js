import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../redux/action/getCarts";
import { Link,useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import './cartComponents.css'

const CartComponents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const  {cartItems}  = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  useEffect(() => {
    // This block of code will run whenever cartItems changes
  }, [cartItems]);
  return (
    <div>
      <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">

            {cartItems && 
            <div  className="cartContainer">
              <div className='leftSideSection'>
              {cartItems.map((item) => (
                <div className='left_cartContainer' key={item.product}>
                  
                        <div className="CartItemCard">
                          <div className='CartItemCardImg'>
                              <img src={item.image} alt="ssa" />    
                          </div>

                          <div className='cartDiscriptions'>
                            <div className='cartTitle'>
                                <div className='cartName'>
                                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                                  <div>Price: <span className='price'>₹{item.price}</span></div>
                                </div>
                               
                                <p onClick={() => deleteCartItems(item.product)} className='deleteIconbtn'><DeleteForeverOutlinedIcon /></p>
                            </div>
                          
                            <div className="cartInput">
                              <div className='wrapper'>
                                <button className='minus'
                                  onClick={() =>
                                    decreaseQuantity(item.product, item.quantity)
                                  }
                                >
                                  -
                                </button>
                                <span className='num' style={{ margin: '0 10px' }}>{item.quantity}</span>
                                <button className='plus'
                                  onClick={() =>
                                    increaseQuantity(
                                      item.product,
                                      item.quantity,
                                      item.stock
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <div>
                              <p className="cartSubtotal">
                                {`₹${item.price * item.quantity}`}
                              </p>
                              </div>
                            </div>
                          </div>
                         
                        </div>
                  
                </div>
              ))}
                </div>
              <div className="cartGrossProfit">
                <div className='ordersummary'>
                Order Summary ({cartItems.length} Items)
                </div>
                <div className='shippingChanges'>
                  <p> Shipping Charges</p>
                      <p>₹0</p>            
                </div>
                <div className="cartGrossProfitBox">
                  <p>Gross Total</p>
                  <p className='redColor'>{`₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}</p>
                </div>
                <div></div>
                <div >
                  <button className="checkOutBtn" onClick={checkoutHandler}>Check Out</button>
                </div>
              </div>
            </div>
            }
          </div>
        </Fragment>
      )}
         </Fragment>
    </div>
  )
}

export default CartComponents