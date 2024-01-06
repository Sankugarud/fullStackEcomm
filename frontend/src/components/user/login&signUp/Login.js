import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearErrors, loadUser } from '../../redux/action/usercalled';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../Layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import './Login.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, loading, authenticated } = useSelector((state) => state.login);

  

  useEffect(() => {
    if (error && !authenticated) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (authenticated) {
      dispatch(loadUser());
      alert.success("login succesful!")
      navigate('/products');
    }
  }, [dispatch, error, alert, authenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className='loginEmail'>
            <MailOutlineOutlinedIcon />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        <div className="loginPass">
          <LockOpenOutlinedIcon/>
            <input className='passInput'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
          <Link to="/forget-password">Forgot Password?</Link>
          <button className="loginBtn" type="submit" disabled={loading}>
            Login
          </button>
          
        </form>
      )}
    </Fragment>
  );
};

export default LoginForm;