import axios from "axios";
import { loginFail, loginRequest, loginSuccess, registerRequest, registerSuccess,registerFail, clearError, logoutsuccess, logoutfail, loadSuccess, loadRequest, loadFail, updateProfileRequest, updateProfileSuccess, updateProfileFail, resetPasswordFail, resetPasswordSuccess, resetPasswordRequest, forgotPasswordFail, forgotPasswordSuccess, forgotPasswordRequest, updatePasswordFail, updatePasswordSuccess, updatePasswordRequest, allUsersRequest, allUsersFail, allUsersSuccess, userDetailsRequest, userDetailsSuccess, userDetailsFail, deleteUserFail, deleteUserSuccess, deleteUserRequest, updateUserFail, updateUserSuccess, updateUserRequest } from "./userAction";


export const loginUser = ({email, password}) => async (dispatch) => {
    try {
      
        dispatch({type:loginRequest});
        const {data} = await axios.post('https://backend-4kbe.onrender.com/api/v1/auth/login',{email,password}, {headers:{
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
        dispatch({type:loginSuccess, payload:data.user});
    } catch (error) {
      console.log(error)
        dispatch({type:loginFail, payload:error.response.data.error});
    }
}

//register 
export const registerUser = ( {email,password,name,avatar}) => async (dispatch) => {
    try {
  

        dispatch({type:registerRequest})
            const {data} = await axios.post('https://backend-4kbe.onrender.com/api/v1/auth/register',{name,email,password,avatar}, {headers:{
                'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
           
        dispatch({type:registerSuccess, payload:data.user})
    } catch (error) {
      if(error.response.data.error.message === 'User validation failed: password: Password should be greater than 8 characters'){
        dispatch({type:registerFail, payload: error.response.data.error.message});
      }else{
        dispatch({type:registerFail, payload: error.response.data.error});
      }
       
    }   
}

//logout
export const logoutUser = () => async (dispatch) => {
    try {
      await axios.get(`https://backend-4kbe.onrender.com/api/v1/auth/logout`,{withCredentials: true});
  
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
      const  {data}  = await axios.get(`https://backend-4kbe.onrender.com/api/v1/auth/me`, config);
      console.log(data)
      dispatch({ type: loadSuccess, payload: data.user });
    } catch (error) {
      console.log(error)
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
  
      const { data } = await axios.put(`https://backend-4kbe.onrender.com/api/v1/auth/me/update`, userData, config);
  
      dispatch({type:updateProfileSuccess,payload:data});
    } catch (error) {
      dispatch({type:updateProfileFail,payload:error});
    }
  };
  
  // Update Password
  export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch(updatePasswordRequest());
      const { data } = await axios.put(`https://backend-4kbe.onrender.com/api/v1/auth/change-password`, passwords, config);
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
      const { data } = await axios.post(`https://backend-4kbe.onrender.com/api/v1/auth/password/forget`, {email}, config);
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
      const { data } = await axios.put(`https://backend-4kbe.onrender.com/api/v1/auth/password/reset/${token}`, passwords, config);
  
      dispatch(resetPasswordSuccess(data));
    } catch (error) {
      dispatch(resetPasswordFail(error));
    }
  };
  export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: allUsersRequest });
      const { data } = await axios.get(`https://backend-4kbe.onrender.com/api/v1/auth/admin/users`,config);
      dispatch({ type: allUsersSuccess, payload: data.allUser });
    } catch (error) {
      dispatch({ type: allUsersFail, payload: error.response.data.message });
    }
  };

  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: userDetailsRequest });
      const { data } = await axios.get(`https://backend-4kbe.onrender.com/api/v1/auth/admin/user/${id}`,config);
  
      dispatch({ type: userDetailsSuccess, payload: data.user });
    } catch (error) {
      dispatch({ type: userDetailsFail, payload: error.response.data.message });
    }
  };


  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: updateUserRequest });
  
      const { data } = await axios.put(
        `https://backend-4kbe.onrender.com/api/v1/auth/admin/user/${id}`,
        userData,
        config
      );
      console.log(data)
      dispatch({ type: updateUserSuccess, payload: data.success });
    } catch (error) {
      console.log(error)
      dispatch({
       
        type: updateUserFail,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: deleteUserRequest });
  
      const { data } = await axios.delete(`https://backend-4kbe.onrender.com/api/v1/auth/admin/user/${id}`,config);
  
      dispatch({ type: deleteUserSuccess, payload: data });
    } catch (error) {
      dispatch({
        type: deleteUserFail,
        payload: error.response.data.message,
      });
    }
  };
  
  