import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../redux/action/getCarts';
import './CartComponent.css';

const CartComponent = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemoveItem = (productId) => {
    dispatch(removeItemsFromCart(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    const item = cartItems.find((item) => item.product === productId);

    if (item) {
      const newQuantity = item.quantity - 1;

      if (newQuantity === 0) {
        dispatch(removeItemsFromCart(productId));
      } else {
        dispatch({
          type: 'ADD_TO_CART', 
          payload: { ...item, quantity: newQuantity },
        });
      }
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const item = cartItems.find((item) => item.product === productId);

    if (item) {
      const newQuantity = item.quantity + 1;

      dispatch({
        type: 'ADD_TO_CART', // Use your actual action type for adding to cart
        payload: { ...item, quantity: newQuantity },
      });
    }
  };
// console.log(cartItems[0])
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems[0].map((item) => (
            <li key={item.product}>
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleDecreaseQuantity(item.product)}>
                  Decrease Quantity
                </button>
                <button onClick={() => handleIncreaseQuantity(item.product)}>
                  Increase Quantity
                </button>
                <button onClick={() => handleRemoveItem(item.product)}>
                  Remove Item
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartComponent;
