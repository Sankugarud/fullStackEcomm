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
    updatePasswordReset,
    allUsersRequest,
    allUsersSuccess,
    allUsersFail,
    userDetailsRequest,
    userDetailsSuccess,
    userDetailsFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserReset,
    loginReset,
    registerReset
  } from "../action/userAction";
  
  // userReducer.js
  const initialState = {
      user: null,
    };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      // case loginRequest:
      // case registerRequest:
      case loadRequest: 
        return {
          loading: true,
          authenticated: false,
        };
      // case loginSuccess:
      // case registerSuccess:
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
      // case loginFail:
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
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
       case loginRequest:
        return {
          loading: true,
          authenticated: false,
        };
         case loginSuccess:
         return {
          ...state,
          loading: false,
          authenticated: true,
          user: action.payload,
        };
        case loginReset:
          return{
            ...state,
            authenticated: false,
          }
        case loginFail:
        return {
          ...state,
          loading: false,
          authenticated: false,
          user: null,
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
  }
  export const RegisterReducer = (state = initialState, action) => {
    switch (action.type) {
       case registerRequest:
        return {
          loading: true,
          authenticated: false,
        };
         case registerSuccess:
         return {
          ...state,
          loading: false,
          authenticated: true,
          user: action.payload,
        };
        case registerReset:
          return{
            ...state,
            authenticated: false,
          }
        case registerFail:
        return {
          ...state,
          loading: false,
          authenticated: false,
          user: null,
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
  }
  
  export const profileReducer = (state = {}, action) => {
    
    switch (action.type) {
      
      case updateProfileRequest:
      case updatePasswordRequest:
      case updateUserRequest:
      case deleteUserRequest:
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
  
     case deleteUserSuccess:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message,
        };
  
      case updateProfileFail:
      case updatePasswordFail:
      case updateUserFail:
      case deleteUserFail:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case updateProfileReset:
      case updatePasswordReset:
      case updateUserReset:
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
  
  export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case allUsersRequest:
        return {
          ...state,
          loading: true,
        };
      case allUsersSuccess:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
  
      case allUsersFail:
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
  
  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case userDetailsRequest:
        return {
          ...state,
          loading: true,
        };
      case userDetailsSuccess:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case userDetailsFail:
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