import React, { Fragment, useEffect } from "react";
import CheckOutPage from "../CheckOutPage/CheckOutPage";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import './ConfirmOrder.css'
import { useAlert } from "react-alert";
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user,authenticated } = useSelector((state) => state.user);
  const alert = useAlert();
    const navigate = useNavigate(); 


    useEffect(() => {
      if (!authenticated) {
     
        alert.error("Plz Sign in for prchased");
        navigate('/cart');
      }
    }, [navigate,alert,authenticated])
    
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  
    
  
  
  // Use this function where you want to initiate Razorpay
  const proceedToPayment = (e) => {
    e.preventDefault();
    // Calculate any necessary data
    const data = {
      subtotal:subtotal,
      shippingCharges:shippingCharges,
      tax:tax,
      totalPrice:totalPrice
    };
  
    // Save order information to sessionStorage or any other storage
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
  
    navigate("/process/payment");
  };

  return (
    <Fragment>
        {user && cartItems && shippingInfo && (
        <>
          <CheckOutPage activeStep={1} />
          <div className="confirmOrderPage">
            <div>
              <div className="confirmshippingArea">
                <p>Shipping Info</p>
                <div className="confirmshippingAreaBox">
                  <div>
                    <p>Name:</p>
                    <span>{user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{shippingInfo.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{address}</span>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <p>Your Cart Items:</p>
                <div className="confirmCartItemsContainer">
                  {cartItems.map((item, index) => (
                    <div key={index}>    
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="orderSummary">
                <p>Order Summary</p>
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>₹{subtotal}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>₹{shippingCharges}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>₹{tax}</span>
                  </div>
                </div>

                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>₹{totalPrice}</span>
                </div>

                <button onClick={proceedToPayment}>Proceed To Payment</button>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default ConfirmOrder;