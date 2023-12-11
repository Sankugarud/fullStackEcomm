import axios from "axios";
import { loginFail, loginRequest, loginSuccess, registerRequest, registerSuccess,registerFail, clearError, logoutsuccess, logoutfail, loadSuccess, loadRequest, loadFail, updateProfileRequest, updateProfileSuccess, updateProfileFail, resetPasswordFail, resetPasswordSuccess, resetPasswordRequest, forgotPasswordFail, forgotPasswordSuccess, forgotPasswordRequest, updatePasswordFail, updatePasswordSuccess, updatePasswordRequest } from "./userAction";


export const loginUser = ({email, password}) => async (dispatch) => {
    try {
      
        dispatch({type:loginRequest});
        const {data} = await axios.post('http://localhost:5000/api/v1/auth/login',{email,password}, {headers:{
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
        dispatch({type:loginSuccess, payload:data.user});
    } catch (error) {
        dispatch({type:loginFail, payload:error.response.data.error});
    }
}

//register 
export const registerUser = ( {email,password,name,avatar}) => async (dispatch) => {
    try {
  

        dispatch({type:registerRequest})
            const {data} = await axios.post('http://localhost:5000/api/v1/auth/register',{name,email,password,avatar}, {headers:{
                'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
           
        dispatch({type:registerSuccess, payload:data.user})
    } catch (error) {
        dispatch({type:registerFail, payload: error.response.data.error});
    }   
}

//logout
export const logoutUser = () => async (dispatch) => {
    try {
      await axios.get(`http://localhost:5000/api/v1/auth/logout`,{withCredentials: true});
  
      dispatch({ type: logoutsuccess });
    } catch (error) {
      dispatch({ type:logoutfail, payload:error.response.data.message });
    }
  };

  const jwtToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const config= {
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${jwtToken}`,
    },
  }
// Load User
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: loadRequest });
      const  {data}  = await axios.get(`http://localhost:5000/api/v1/auth/me`, config);
      dispatch({ type: loadSuccess, payload: data.user });
    } catch (error) {
      dispatch({ type: loadFail, payload: error.response.data.message });
    }
  };

// // error clear
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: clearError });
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({type:updateProfileRequest});
  
      const { data } = await axios.put(`http://localhost:5000/api/v1/auth/me/update`, userData, config);
  
      dispatch({type:updateProfileSuccess,payload:data});
    } catch (error) {
      dispatch({type:updateProfileFail,payload:error});
    }
  };
  
  // Update Password
  export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch(updatePasswordRequest());
      const { data } = await axios.put(`http://localhost:5000/api/v1/auth/change-password`, passwords, config);
      dispatch({type:updatePasswordSuccess,payload:data});
    } catch (error) {
      dispatch({type:updatePasswordFail,payload:error});
    }
  };
  
  // Forgot Password
  export const forgotPassword = ({email}) => async (dispatch) => {
    try {
      dispatch(forgotPasswordRequest());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`http://localhost:5000/api/v1/auth/password/forget`, {email}, config);
      dispatch(forgotPasswordSuccess(data));
    } catch (error) {
      dispatch(forgotPasswordFail(error));
    }
  };
  
  // Reset Password
  export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch(resetPasswordRequest());
  
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(`http://localhost:5000/api/v1/auth/password/reset/${token}`, passwords, config);
  
      dispatch(resetPasswordSuccess(data));
    } catch (error) {
      dispatch(resetPasswordFail(error));
    }
  };