import React from 'react'
import { Link } from 'react-router-dom'
import '../Products/Product.css'
import { Rating } from '@mui/material';
const AllProducts = ({item}) => {
  const options = {
    value: item.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div>
        <Link key={item._id} className="allProductCard" to={`/product/${item._id}`}>
              <img src={item.images[0].url}alt="img" />
              <p>{item.name}</p>
              <div>
                <Rating {...options} />{" "}
                <span className="productCardSpan">
                    {" "}
                    ({item.numOfReviews} Reviews)
                </span>
              </div>
              
              <p>{`₹$${item.price}`}</p>
              
        </Link>
        
    </div>
  )
}

export default AllProducts