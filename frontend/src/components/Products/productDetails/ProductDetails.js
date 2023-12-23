import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails, newReview } from '../../redux/action/getproduct';
import Loader from '../../layout/Loader/Loader';
import { clearErrors } from '../../redux/action/usercalled';
import { useAlert } from 'react-alert';
import { addItemsToCart } from '../../redux/action/getCarts';
import { Rating } from '@mui/material';
import { newReviewReset } from '../../redux/action/productActionFunction';
import Carousel from "react-material-ui-carousel";
import './ProductDetails.css'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ReviewCard from './ReviewCard';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
        return;
      }
      dispatch(productDetails(id));
    };
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: newReviewReset });
    }
    fetchData();
  }, [alert, dispatch,success,reviewError, error, id]);

  const handleIncrement = () => {
    if (quantity < product.product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const options = {
    size: "large",
    value: product && product.product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
 
  const handleAddToCart = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  
  
  const handleReviewSubmit = () => {

    const form = {
      productId:id,
      rating:rating,
      comment:comment
    }
    dispatch(newReview(form));
    
    setOpen(false);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div >
          {product && (
            <div className='productDrtailsContainer'>
              <div className='headingLable'>
                <h1>{`Home / Products / ${product.product.name}`}</h1>
              </div>
              <div className='blurLine'></div>
            <div className='ProductDetails' key={product.product._id}>
              <div className='CarouselImage'>
                <Carousel>
                  {product.product.images &&
                    product.product.images.map((item, i) => (
                      <img
                        className="CarouselImages"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>
            
              <div className='detailBlock'>
                <div className="detailsBlock-1">
                  <h2 className="capitalize-first-letter">{product.product.name}</h2>
                </div>
                <div className="detailsBlock-2">
                  <Rating {...options} 
                   sx={{
                    fontSize: "1.5rem",
                  }}/>
                  <span className="detailsBlock-2-span">
                    {" "}
                    ({product.product.numOfReviews} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <p>Price : ₹{product.product.price}</p>
                  <div className="detailsBlock-3-1">
                    <div className="wrapper">
                      <button className='minus' onClick={handleDecrement}>-</button>
                      <span className='num' style={{ margin: '0 10px' }}>{quantity}</span>
                      <button className='plus' onClick={handleIncrement}>+</button>
                    </div>
                    <div className='addToCart'>
                      <button className='addToCartBtn'
                         onClick={handleAddToCart}
                         disabled={product.product.stock < 1 ? true : false}                      >
                       Add to Cart
                      </button>
                      <p>
                        Status:
                        <b className={product.product.stock < 1 ? "redColor" : "greenColor"}>
                        {  product.product.stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                      </p>
                    </div>
                  </div>
                    <div className="detailsBlock-4">
                    <span>Description:</span><p>{product.product.description}</p>
                    </div>
                     
                  <button onClick={submitReviewToggle} className="submitReview">
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
              
              <div>
              <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={open}
                      onClose={submitReviewToggle}
                    >
                      <DialogTitle>Submit Review</DialogTitle>
                      <DialogContent className="submitDialog">
                        <Rating
                          onChange={(e) => setRating(Number(e.target.value))}
                          value={Number(rating)}
                          size="small"
                          
                        />

                          <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                      </DialogContent>
                      <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={handleReviewSubmit} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {product.product.reviews && product.product.reviews[0] ? (
                      <div className="reviews">
                        {product.product.reviews &&
                          product.product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                          ))}
                      </div>
                    ) : (
                      <p className="noReviews">No Reviews Yet</p>
                    )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
