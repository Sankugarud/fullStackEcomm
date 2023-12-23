import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, registerUser } from '../../redux/action/usercalled';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MenuItem, Select, FormControl,Avatar  } from '@mui/material';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import './SwitchTabs.css'; 
import Loader from '../../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, authenticated } = useSelector(
    (state) => state.register
  );
  const navigate = useNavigate()
  const logos = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdyqzm0Ksxv6KPGwWwlSNkrgW4QitvCQdfnQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHOCwTxPSE_69-L09Rub4GHLDqWjmSoayMDQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL0_1DB8e4plocmtjr3-Yb2TuwH9qYDk8NeQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9xF2ezehxH_pi2YwRKLBvlmBlCNZdyX9sg&usqp=CAU'
  ];
  const defaultLogo = logos[0];
  const [selectedLogo, setSelectedLogo] = useState(defaultLogo);


  const handleChange = (event) => {
    setSelectedLogo(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniquePublicId = uuidv4();
    dispatch(
      registerUser({
        email,
        password,
        name,
        avatar: {
          public_id: uniquePublicId,
          url: selectedLogo,
        },
      })
    );
  };
        useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (authenticated) {
          dispatch(loadUser());
            navigate('/products')
        }
      }, [dispatch,alert, error, authenticated,navigate]);
  return (

    <Fragment>
        {loading ? (
      <Loader />
    ) : (
        <form onSubmit={handleSubmit}  className="signUpForm">
          <div className='logo-selection'>
            <FormControl className='formcontrol'>
              {/* <div>
               <InputLabel id="logo-dropdown-label">Select Logo</InputLabel>
              </div> */}
              <div className='logo-items'>
                <Select
                labelId="logo-dropdown-label"
                id="logo-dropdown"
                value={selectedLogo}
                onChange={handleChange}
                sx={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  padding: 0,
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                {logos.map((logo, index) => (
                  <MenuItem key={index} value={logo}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        alt={`Logo ${index + 1}`}
                        src={logo}
                        sx={{ width: 50, height: 50, marginRight: 5 }}
                      />
                    </div>
                  </MenuItem>
                ))}
               </Select>
              </div>
           
            </FormControl>
          </div>
          
          <div  className="signUpName">
          <FaceIcon />
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="signUpEmail">
                  <MailOutlineIcon />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signUpPassword">
                  <LockOpenIcon />
            <input
              type="password"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
      
      <button type="submit"  className="signUpBtn">Register</button>
    </form>

    )}
     </Fragment>
    
  );
};

export default RegisterForm;
