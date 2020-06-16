import { auth, fireStore } from '../../firebase/firebase.utils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS_UPDATE = 'VERIFY_SUCCESS_UPDATE';
export const VERIFY_SUCCESS_NO_UPDATE = 'VERIFY_SUCCESS_NO_UPDATE';

export const UPDATE_USER_DETAILS = 'UPDATE_USER_CONFIG';

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

const receiveUserDetails = (user) => {
  return {
    type: UPDATE_USER_DETAILS,
    payload: {
      userInfo: user,
    },
  };
};
// Async

// const updateUserDetails = (user) => {
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {
//       // initialize userDetails
//       fireStore
//         .collection('users')
//         .doc(user.uid)
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             console.log('This user has a user details file');
//             dispatch(receiveUserDetails(doc.data()));
//             resolve();
//           } else {
//             console.log('this user does not have a user details file');
//             let data = {
//               rooms: [],
//             };

//             fireStore
//               .collection('users')
//               .doc(user.uid)
//               .set(data)
//               .then(function (doc) {
//                 console.log('Document successfully written!');
//                 console.log('This is the doc return ');
//                 console.log(doc);
//                 dispatch(receiveUserDetails(data));
//                 resolve();
//               })
//               .catch(function (error) {
//                 console.error('Error writing document: ', error);
//                 reject(error);
//               });
//           }
//         })
//         .catch((err) => {
//           console.log('There was an error trying to read user details');
//           console.log(err);
//           reject(err);
//         });
//     });
//   };
// };

const updateUserDetails = (user) => {
  return async (dispatch) => {
    // initialize userDetails
    try {
      let doc = await fireStore.collection('users').doc(user.uid).get();
      console.log(doc);
      console.log(doc.data());
      if (doc.exists) {
        console.log('This user has a user details file');
        dispatch(receiveUserDetails(doc.data()));
      } else {
        console.log('this user does not have a user details file');
        let data = {
          rooms: [],
        };
        await fireStore.collection('users').doc(user.uid).set(data);
        dispatch(receiveUserDetails(data));
      }
    } catch (error) {
      console.error('Error writing document: ', error);
    }

    return;
  };
};

// export const loginUser = (type, username, pass) => {
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {
//       switch (type) {
//         case 'new':
//           dispatch(requestLogin());
//           auth
//             .createUserWithEmailAndPassword(username, pass)
//             .then((user) => {
//               console.log('successfully made a new user, via login component');
//               console.log(user);

//               dispatch(receiveLogin(user));
//               // initialize userDetails
//               dispatch(updateUserDetails(user)).then(() => {
//                 resolve();
//               });
//             })
//             .catch(function (error) {
//               console.log('issue logging in as a new user via login component');
//               const { message, code } = error;
//               dispatch(loginError(code, message));
//               reject();
//             });

//           break;
//         case 'signIn':
//           dispatch(requestLogin());
//           auth
//             .signInWithEmailAndPassword(username, pass)
//             .then(({ user }) => {
//               console.log('Successgully Signed in, via login button function');
//               console.log(user);

//               dispatch(receiveLogin(user));
//               // initialize userDetails
//               dispatch(updateUserDetails(user)).then(() => {
//                 resolve();
//               });
//             })
//             .catch(function (error) {
//               console.log('error occured when logging in atttempt ');
//               // Handle Errors here.
//               const { message, code } = error;
//               dispatch(loginError(code, message));
//               reject();
//             });
//           break;
//         default:
//           reject(new Error('Sign in type was not provided correctly'));
//           break;
//       }
//     });
//   };
// };

export const loginUser = (type, username, pass) => {
  return async (dispatch) => {
    switch (type) {
      case 'new':
        dispatch(requestLogin());
        try {
          let result = await auth.createUserWithEmailAndPassword(
            username,
            pass
          );
          await dispatch(updateUserDetails(result.user));
          dispatch(receiveLogin(result.user));
        } catch (error) {
          console.log('issue logging in as a new user via login component');
          const { message, code } = error;
          if (message && code) {
            dispatch(loginError(code, message));
          }
          return Promise.reject('Login failed, Do not redirect');
        }
        break;
      case 'signIn':
        dispatch(requestLogin());
        try {
          let result = await auth.signInWithEmailAndPassword(username, pass);
          console.log(result.user);
          await dispatch(updateUserDetails(result.user));
          dispatch(receiveLogin(result.user));
        } catch (error) {
          console.log('error occured when logging in atttempt ');
          // Handle Errors here.
          const { message, code } = error;
          if (message && code) {
            dispatch(loginError(code, message));
          }
          return Promise.reject('Login failed, Do not redirect');
        }

        break;
      default:
        new Error('Sign in type was not provided correctly');
        break;
    }

    return 'done';
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

// Async VerifyAuth
// Old example

// export const verifyAuth = () => (dispatch, getState) => {
//   dispatch(verifyRequest());
//   auth.onAuthStateChanged((user) => {
//     if (user !== null) {
//       // User is logged in , sync user object to redux state
//       if (isEmpty(getState().user)) {
//         dispatch(receiveLogin(user));
//         // initialize userDetails
//         dispatch(updateUserDetails(user)).then(() => {
//           dispatch(verifySuccessUpdate());
//         });
//       } else {
//         dispatch(verifySuccessNoUpdate());
//       }
//     } else {
//       dispatch(verifySuccessNoUpdate());
//     }
//   });
// };

export const verifyAuth = () => (dispatch, getState) => {
  dispatch(verifyRequest()); // set veryfing flag to true
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user !== null) {
      // User is logged in , sync user object to redux state
      if (isEmpty(getState().user)) {
        // initialize userDetails
        try {
          await dispatch(updateUserDetails(user)); // update userInfo/acount details based on userID found
        } catch (err) {
          console.log(
            'An error occured while updating userDetails in initial verification'
          );
          console.log(err);
        }
        dispatch(receiveLogin(user)); // save userID in state
        dispatch(verifySuccessUpdate());
      } else {
        dispatch(verifySuccessNoUpdate()); // set verifying flag to false
      }
    } else {
      dispatch(verifySuccessNoUpdate()); // set verifying flag to false
    }
    unsubscribe();
  });
};

// Helper functions
const isEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
};
