// components/ProductDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../redux/action/getproduct';
import Loader from '../layout/Loader/Loader';
import { clearErrors } from '../redux/action/usercalled';
import { useAlert } from 'react-alert';
import { addItemsToCart } from '../redux/action/getCarts';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = () => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
        return;
      }
      dispatch(productDetails(id));
    };
    fetchData();
  }, [alert, dispatch, error, id]);

  const handleIncrement = () => {
    if (quantity < product.product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addItemsToCart(id, quantity));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {product && (
            <div key={product._id}>
              <img src={product.product.images[0].url} alt="img" />
              <p>{product.product.name}</p>
              <p>{product.product.price}</p>
              <p>{product.product.description}</p>
              <p>Stock: {product.product.stock}</p>
              <div>
                <button onClick={handleDecrement}>-</button>
                <span style={{ margin: '0 10px' }}>{quantity}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.product.stock === 0}
              >
                {product.product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
