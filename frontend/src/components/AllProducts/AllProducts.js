import React from 'react'
import { Link } from 'react-router-dom'

const AllProducts = ({item}) => {
  return (
    <div>
        <Link key={item._id} to={`/product/${item._id}`}>
            <div key={item._id}>
              <img src={item.images[0].url}alt="img" />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.description}</p>
            </div>
        </Link>
        
    </div>
  )
}

export default AllProducts