import { error_clear,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL, 
    LOGOUT_SUCCESS, 
    REGISTER_USER_FAIL, 
    REGISTER_USER_REQUEST, 
    REGISTER_USER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_RESET,
    LOGIN_RESET,
    REGISTER_RESET, } from "../actionTypes/userActionTypes";



export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (data) => ({ type: LOGIN_SUCCESS, payload:  data, });
export const loginFail = (error) => ({ type: LOGIN_FAIL, payload: error });
export const loginReset = () => ({type:LOGIN_RESET})

export const registerRequest = () => ({ type: REGISTER_USER_REQUEST });
export const registerSuccess = (data) => ({ type:REGISTER_USER_SUCCESS, payload:  data, });
export const registerFail = (error) => ({ type: REGISTER_USER_FAIL, payload: error });
export const registerReset = () => ({type:REGISTER_RESET})

export const loadRequest = () => ({ type: LOAD_USER_REQUEST });
export const loadSuccess = (data) => ({ type:LOAD_USER_SUCCESS, payload:  data, });
export const loadFail = (error) => ({ type: LOAD_USER_FAIL, payload: error });

export const logoutsuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutfail = (error) => ({ type:LOGOUT_FAIL, payload:error});

// Update Profile
export const updateProfileRequest = () => ({ type: UPDATE_PROFILE_REQUEST });
export const updateProfileSuccess = (data) => ({ type: UPDATE_PROFILE_SUCCESS, payload: data })
    
export const updateProfileReset = (data) => ({ type: UPDATE_PROFILE_RESET, payload: data });
export const updateProfileFail = (error) => ({ type: UPDATE_PROFILE_FAIL, payload: error });

// Update Password
export const updatePasswordRequest = () => ({ type: UPDATE_PASSWORD_REQUEST });
export const updatePasswordSuccess = (data) => ({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
export const updatePasswordReset = () => ({ type: UPDATE_PASSWORD_RESET });
export const updatePasswordFail = (error) => ({ type: UPDATE_PASSWORD_FAIL, payload: error });


// Forgot Password
export const forgotPasswordRequest = () => ({ type: FORGOT_PASSWORD_REQUEST });
export const forgotPasswordSuccess = (data) => ({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
export const forgotPasswordFail = (error) => ({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });

// Reset Password
export const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST });
export const resetPasswordSuccess = (data) => ({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
export const resetPasswordFail = (error) => ({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });


export const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
export const updateUserSuccess = (data) => ({ type: UPDATE_USER_SUCCESS, payload: data });
export const updateUserFail = (error) => ({ type: UPDATE_USER_FAIL, payload: error });
export const updateUserReset = () => ({ type: UPDATE_USER_RESET});


// Get All Users
export const allUsersRequest = () => ({ type: ALL_USERS_REQUEST });
export const allUsersSuccess = (data) => ({ type: ALL_USERS_SUCCESS, payload: data });
export const allUsersFail = (error) => ({ type: ALL_USERS_FAIL, payload: error });

// Get User Details
export const userDetailsRequest = () => ({ type: USER_DETAILS_REQUEST });
export const userDetailsSuccess = (data) => ({ type: USER_DETAILS_SUCCESS, payload: data });
export const userDetailsFail = (error) => ({ type: USER_DETAILS_FAIL, payload: error });

// Delete User
export const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST });
export const deleteUserSuccess = (data) => ({ type: DELETE_USER_SUCCESS, payload: data });
export const deleteUserFail = (error) => ({ type: DELETE_USER_FAIL, payload: error });
export const deleteUserReset = () => ({ type: DELETE_USER_RESET });

export const clearError = () => ({ type: error_clear });
