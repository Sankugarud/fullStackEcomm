import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate  } from "react-router-dom";
const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handlechange = (e) => {  
    if (search.trim()) {
      navigate(`/products/${search}`);
    } else {
      navigate("/products");
    }
  }
 
  return (
    <div>
        <div className="left_side">Logo</div>
        <div className="right_side">
            <div className="middle_side">
                  <input type="text" onKeyUp={handlechange} onChange={(e)=> setSearch(e.target.value)} value={search} name="search" id="search" />
                <Link to='/products'>products</Link>
                <Link>contact</Link>
                <Link>About</Link>
            </div>
            <div className="login">
                <button onClick={() => navigate('/signin ')}>Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar