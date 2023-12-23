import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, LinkedIn, Facebook, GitHub, YouTube } from '@mui/icons-material';
import './Footer.css'
const FooterPage = () => {
  return (
  
    <footer>
    <div className='footer'>

      {/* First Line */}
      <div className="firstLine">
        <Link to="#" >About</Link>
        <Link to="#" >Blog</Link>
        <Link to="#">Jobs</Link>
        <Link to="#" >Press</Link>
        <Link to="#" >Accessibility</Link>
        <Link to="#" >Partners and Contacts</Link>
      </div>

      {/* Second Line */}
      <div className="secondLine">
        <div>
          <Instagram  />
          <Twitter  />
          <LinkedIn  />
          <Facebook  />
          <GitHub  />
          <YouTube  />
        </div>
       

        {/* Placeholder Man Logo */}
        <div className="manlogo">👨‍💼</div>
      </div>

      {/* Third Line */}
      <div>
        <p className="text-sm">&copy; 2023 Your Company, Inc. All rights reserved.</p>
      </div>

    </div>
  </footer>
      );
    };
    
export default FooterPage;