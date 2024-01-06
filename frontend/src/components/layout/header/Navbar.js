import React, { useEffect, useState } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { useNavigate  } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {  useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import UserOptions from './UserOptions';
const Navbar = () => {
  const [search, setSearch] = useState('');
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate();

  const handlechange = (e) => {  
    if (search.trim()) {
      navigate(`/products/${search}`);
    } else {
      navigate("/products");
    }
  }
  const { authenticated, user } = useSelector((state) => state.user);
 const {cartItems} = useSelector((state) => state.cart)
 
 
 useEffect(() => {
  if(authenticated){
    setAuth(true);
   }else{
    setAuth(false);
   }
 }, [authenticated])
 
  return (
    <div className="navbar">
        <div className="left_side"> <Link to="/">
          <img src='https://www.digitaldesignsolutions.co/wp-content/uploads/2017/03/bc-logo-horizontal-no-tag.png' alt='logo'/>
          </Link></div>
        <div className="right_side">
            <div className="middle_side">
            <div className='inputs'>
            <SearchIcon style={{ marginRight: '0.5rem' }} />            
              <input type="text" onKeyUp={handlechange} onChange={(e)=> setSearch(e.target.value)} placeholder='Enter Anything' value={search} name="search" id="search" />
            </div>
                <Link to='/products'>Products</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/about'>About</Link>
                
            </div>
            <div className="end_side">
              <div className='cartDiv'>
                <ShoppingCartIcon
                  className='cartIcon'
                  style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
                  onClick={() => navigate('/cart')}
                />
              </div>
           
              <div>
                {auth ? <UserOptions user={user} /> : <AssignmentIndRoundedIcon onClick={() => navigate('/signin')} />}
              </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar