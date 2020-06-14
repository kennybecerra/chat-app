import { auth } from '../../firebase/firebase.utils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS_UPDATE = 'VERIFY_SUCCESS_UPDATE';
export const VERIFY_SUCCESS_NO_UPDATE = 'VERIFY_SUCCESS_NO_UPDATE';

// Log In Action Creators
const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
};

const loginError = (errorCode, errorMessage) => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      errorCode,
      errorMessage,
    },
  };
};

// ASync
export const loginUser = (type, username, pass) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      switch (type) {
        case 'new':
          dispatch(requestLogin());
          auth
            .createUserWithEmailAndPassword(username, pass)
            .then((user) => {
              console.log('successfully made a new user, via login component');
              console.log(user);
              dispatch(receiveLogin(user));
              resolve();
            })
            .catch(function (error) {
              console.log('issue logging in as a new user via login component');
              const { message, code } = error;
              dispatch(loginError(code, message));
              reject();
            });

          break;
        case 'signIn':
          dispatch(requestLogin());
          auth
            .signInWithEmailAndPassword(username, pass)
            .then(({ user }) => {
              console.log('Successgully Signed in, via login button function');
              console.log(user);
              dispatch(receiveLogin(user));
              resolve();
            })
            .catch(function (error) {
              console.log('error occured when logging in atttempt ');
              // Handle Errors here.
              const { message, code } = error;
              dispatch(loginError(code, message));
              reject();
            });
          break;
        default:
          reject(new Error('Sign in type was not provided correctly'));
          break;
      }
    });
  };
};

//LOG Out Action Creators
const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = (errorCode, errorMessage) => {
  return {
    type: LOGOUT_FAILURE,
    payload: {
      errorCode,
      errorMessage,
    },
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  auth
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch((error) => {
      //Do something with the error if you want!
      const { message, code } = error;
      dispatch(logoutError(code, message));
    });
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccessUpdate = () => {
  return {
    type: VERIFY_SUCCESS_UPDATE,
  };
};

const verifySuccessNoUpdate = () => {
  return {
    type: VERIFY_SUCCESS_NO_UPDATE,
  };
};

// ASync VerifyAuth
export const verifyAuth = () => (dispatch, getState) => {
  dispatch(verifyRequest());
  auth.onAuthStateChanged((user) => {
    if (user !== null) {
      // User is logged in , sync user object to redux state
      if (isEmpty(getState().user)) {
        dispatch(receiveLogin(user));
        dispatch(verifySuccessUpdate());
      } else {
        dispatch(verifySuccessNoUpdate());
      }
    } else {
      dispatch(verifySuccessNoUpdate());
    }
  });
};

// Helper functions
const isEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
};
