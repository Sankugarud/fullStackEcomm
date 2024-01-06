import React, { useCallback, useEffect, useState, useRef } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../redux/action/usercalled";
import { createOrder } from "../../redux/action/orderAction";
import { useNavigate } from "react-router-dom";
import { clearcartitem } from "../../redux/action/cartAction";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [orderDispatched, setOrderDispatched] = useState(false);
  const rzpayRef = useRef(null); // Use a ref to hold the Razorpay instance

  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const { cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const handlePayment = useCallback(async () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};

    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };

    const orderData = {
      shippingInfo: shippingInfo,
      itemOrder: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };

    const options = {
      key: 'rzp_test_X0EwLsfjx0sFV3',  // Replace with your actual test API key
      amount: paymentData.amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://www.svgrepo.com/show/250771/ecommerce.svg",
      
      handler: function (response) {
       

        if (response.razorpay_payment_id && !orderDispatched) {
          alert.success("Payment successful!");

          // Dispatch createOrder only when payment is successful
          dispatch(createOrder(orderData));

          // Set the flag to true to prevent multiple dispatches
          setOrderDispatched(true);

          localStorage.removeItem("cartItems");
          dispatch({type:clearcartitem})
          // Navigate after dispatching the order
          navigate("/orders");

          // Close the Razorpay modal using ref
          if (rzpayRef.current) {
            rzpayRef.current.close();
          }
        } else {
          alert.error("Payment failed. Please try again.");

          // Navigate to the shipping page
          navigate("/shipping");

          // Close the Razorpay modal using ref
          if (rzpayRef.current) {
            rzpayRef.current.close();
            document.body.style.overflow = 'auto';
          }
        }
      },
      "modal": {
        escape: false,
        "ondismiss": function(){
             window.location.replace("/cart");
         }
    },
      prefill: {
        name: "Ecommerse",
        email: "Ecommerse@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const newRzpay = new window.Razorpay(options);
    rzpayRef.current = newRzpay; // Update the ref with the new Razorpay instance
    newRzpay.open();

  }, [navigate, alert, shippingInfo, cartItems, dispatch, orderDispatched, rzpayRef]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (!rzpayRef.current) {
      handlePayment();
    }
  }, [error, alert, dispatch, rzpayRef, handlePayment]);

  return (
    <div className="product">
      {/* Render any additional content or components here if needed */}
    </div>
  );
};

export default Payment;