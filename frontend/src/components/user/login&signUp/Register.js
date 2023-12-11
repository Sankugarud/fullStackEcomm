import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/action/usercalled';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './SwitchTabs.css'; 
import Loader from '../../layout/Loader/Loader';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error, loading, authenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate()
  const logos = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdyqzm0Ksxv6KPGwWwlSNkrgW4QitvCQdfnQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHOCwTxPSE_69-L09Rub4GHLDqWjmSoayMDQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL0_1DB8e4plocmtjr3-Yb2TuwH9qYDk8NeQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9xF2ezehxH_pi2YwRKLBvlmBlCNZdyX9sg&usqp=CAU'
  ];

  const [name, setName] = useState('');
  const defaultLogo = logos[0];
  const [selectedLogo, setSelectedLogo] = useState(defaultLogo);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogoChange = (e) => {
    setSelectedLogo(e.target.value);
    // Hide all options after selection
    const logoOptions = document.querySelectorAll('.logo-option');
    logoOptions.forEach(option => option.classList.remove('selected'));
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
          console.log(error)
        }
    
        if (authenticated) {
            console.log('Navigating to /products');
            navigate('/products')
        }
      }, [dispatch, error, authenticated,navigate]);
  return (

    <Fragment>
        {loading ? (
      <Loader />
    ) : (
        <form onSubmit={handleSubmit} className="register-form">
            {error && (
            <div style={{ color: 'red' }}>
                {typeof error === 'string' ? error : 'An error occurred.'}
            </div>
        )}
      <label htmlFor="logo">Select Logo:</label>
      <div className="custom-dropdown">
        {logos.map((logo, index) => (
          <div
            key={index}
            className={`logo-option ${selectedLogo === logo ? 'selected' : ''}`}
            onClick={() => handleLogoChange({ target: { value: logo } })}
          >
            <img src={logo} alt={index} />
          </div>
        ))}
      </div>
      <label htmlFor="name">New Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="newPassword">New Password:</label>
      <input
        type="password"
        id="newPassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>

    )}
     </Fragment>
    
  );
};

export default RegisterForm;
