import React, { Fragment, useEffect, useState } from 'react';
import Loader from '../../Layout/Loader/Loader';
import { useDispatch, useSelector  } from 'react-redux';
import { clearErrors, getproduct } from '../../redux/action/getproduct';
import AllProducts from '../../Products/AllProducts/AllProducts';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {  Slider } from '@mui/material';
import { useAlert } from 'react-alert';
import './Product.css'

const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const alert = useAlert();

    const { products, loading, error } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 100000]);
    const [prevKeyword, setPrevKeyword] = useState('');
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    

    const categories = [
      "All",
      "Laptop",
      "FootWear",
      "BottomWear",
      "TopWear",
      "EarPhones",
      "Camera",
      "SmartPhone",
      "watch",
      "Toys"
    ];
      
      //change price filter function
      const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
      //change page filter function
      const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
      };

      

      useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if (keyword !== prevKeyword) {
          setCurrentPage(1);
        }
        dispatch(getproduct(keyword,currentPage,price,category,ratings))
        setPrevKeyword(keyword);

      }, [dispatch,alert,error,keyword,currentPage,price,category,ratings,prevKeyword]);
      const count = Math.ceil((products.productsCount || 0) / (products.resultPerPage || 1));

  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <div className='all_products'>
        <div className='left_part'>
            
            <div className='categoriesTag'>
            <h1>Categories</h1>
            <ul className="categoryBox">
            {categories.map((categoryItem) => (
                <div key={categoryItem}>
                <li
                    className="category-link"
                    onClick={() => setCategory(categoryItem)}
                >
                    <input
                        type='checkbox'
                        className="custom-checkbox"
                        checked={category === categoryItem}
                        onChange={() => setCategory(categoryItem)}
                    />
                    {categoryItem}
                </li>
                </div>
            ))}
            </ul>
            </div>
            <div className='priceTag'>
                <h1>Price</h1>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={100000}
                />
            </div>

            <div className='ratingTag'>
            <fieldset>
                <h1 component="legend">Ratings Above</h1>
                <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                        setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                />
          </fieldset>
            </div>
            
            
        </div>
        <div  className="allProductContainer">
            {products.product &&
            products.product.map((item) => (
                <AllProducts key={item._id} item={item}/>
            ))}
        </div>
        
      </div>
    )}
    <div className='paginations'>
    <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Pagination 
          count = {count}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
    
  </Fragment>
  )
}

export default Products