import React, { Fragment, useEffect, useState } from 'react';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector  } from 'react-redux';
import { getproduct } from '../redux/action/getproduct';
import AllProducts from '../AllProducts/AllProducts';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Slider, Typography } from '@mui/material';


const Home = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();

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
      "watch"
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
            dispatch(error)
        }
        if (keyword !== prevKeyword) {
          setCurrentPage(1);
        }
        dispatch(getproduct(keyword,currentPage,price,category,ratings))
        setPrevKeyword(keyword);

      }, [dispatch,error,keyword,currentPage,price,category,ratings,prevKeyword]);
      const count = Math.ceil((products.productsCount || 0) / (products.resultPerPage || 1));

  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <div>
         <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={100000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
            <Typography component="legend">Ratings Above</Typography>
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
        {products.product &&
          products.product.map((item) => (
            <AllProducts key={item._id} item={item}/>
          ))}
      </div>
    )}
    <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Pagination
          count = {count}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
  </Fragment>
  )
}

export default Home