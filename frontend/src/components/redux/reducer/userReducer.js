import { clearError, loadFail, loadRequest, loadSuccess, loginFail, loginRequest, loginSuccess, logoutfail, logoutsuccess, registerFail, registerRequest, registerSuccess,
  updateProfileRequest,
  updatePasswordRequest,
  resetPasswordFail,
  forgotPasswordFail,
  resetPasswordSuccess,
  forgotPasswordSuccess,
  forgotPasswordRequest,
  resetPasswordRequest,
  updatePasswordFail,
  updateProfileFail,
  updatePasswordSuccess,
  updateProfileSuccess,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  updateProfileReset,
  updatePasswordReset
} from "../action/userAction";

// userReducer.js
const initialState = {
    user: null,
  };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginRequest:
    case registerRequest:
    case loadRequest: 
      return {
        loading: true,
        authenticated: false,
      };
    case loginSuccess:
    case registerSuccess:
    case loadSuccess:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: action.payload,
      };

    case logoutsuccess:
      return {
        loading: false,
        user: null,
        authenticated: false,
      };
    case loginFail:
    case registerFail:
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: null,
        error: action.payload,
      };

    case loadFail:
      return {
        loading: false,
        authenticated: false,
        user: null,
        error: action.payload,
      };

    case logoutfail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case clearError:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const profileReducer = (state = {}, action) => {
  
  switch (action.type) {
    
    case updateProfileRequest:
    case updatePasswordRequest:
    case updateUserRequest:
    // case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case updateProfileSuccess:
    case updatePasswordSuccess:
    case updateUserSuccess:
     
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

   // case DELETE_USER_SUCCESS:
      // return {
      //   ...state,
      //   loading: false,
      //   isDeleted: action.payload.success,
      //   message: action.payload.message,
      // };

    case updateProfileFail:
    case updatePasswordFail:
    case updateUserFail:
    // case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case updateProfileReset:
    case updatePasswordReset:
    // case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    
    case clearError:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case forgotPasswordRequest:
    case resetPasswordRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case forgotPasswordSuccess:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case resetPasswordSuccess:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case forgotPasswordFail:
    case resetPasswordFail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case clearError:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};