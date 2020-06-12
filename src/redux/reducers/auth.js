import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS_UPDATE,
  VERIFY_SUCCESS_NO_UPDATE,
} from '../actions/';

const initialState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  verifyingError: false,
  isAuthenticated: false,
  errroCode: null,
  errorMessage: null,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
        errroCode: null,
        errorMessage: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.payload.user,
        loginError: false,
        errroCode: null,
        errorMessage: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
        errroCode: action.payload.errroCode,
        errorMessage: action.payload.errorMessage,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
        logoutError: false,
        errroCode: null,
        errorMessage: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
        errroCode: action.payload.errroCode,
        errorMessage: action.payload.errorMessage,
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      };
    case VERIFY_SUCCESS_UPDATE:
      return {
        ...state,
        isVerifying: false,
      };
    case VERIFY_SUCCESS_NO_UPDATE:
      return {
        ...state,
        isVerifying: false,
      };
    default:
      return state;
  }
};
