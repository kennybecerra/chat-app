import React, { useReducer } from 'react';
import {
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  Form,
} from '../../components/UI/FormControls/FormControls';
import { auth } from '../../firebase/firebase.utils';

import useWindowSize from '../../hooks/useWindowSize';
import { useSpring, useTransition, animated } from 'react-spring';

import './Login.scss';

const reducer = (state, action) => {
  let newState = {
    ...state,
    email: {
      ...state.email,
    },
    password: {
      ...state.password,
    },
  };

  switch (action.type) {
    case 'new-user':
      newState.newUser = true;
      break;
    case 'old-user':
      newState.newUser = false;
      break;
    case 'email-update':
      newState.email.value = action.value;
      newState.email.ready = action.ready;
      break;
    case 'password-update':
      newState.password.value = action.value;
      newState.password.ready = action.ready;
      break;
    case 'error':
      newState.errorMessage = action.message;
      newState.errorCode = action.code;
      newState.loading = false;
      break;
    case 'start-signIn':
      newState.loading = true;
      newState.errorMessage = null;
      newState.errorCode = null;
      break;
    case 'end-signIn':
      newState.loading = false;
      break;
    default:
      console.log('Error occured, unknown action type in Login reducer');
      throw new Error('unknown action type in Login reducer');
  }

  return newState;
};

const initialState = {
  newUser: false,
  email: {
    value: '',
    ready: false,
  },
  password: {
    value: '',
    ready: false,
  },
  errorMessage: null,
  errorCode: null,
  loading: false,
};

const Login = () => {
  // Holds entire login state
  const [loginState, dispatch] = useReducer(reducer, initialState);

  // Detect changes in window width
  const { width } = useWindowSize();

  // innerLogin container animation (slide left or right depending on singup tupe , up and down for mobile)
  const [springStyles, set] = useSpring(() => ({
    top: width <= 600 ? '50%' : '-5%',
    left: width <= 600 ? '0%' : '50%',
  }));

  set({
    top: loginState.newUser
      ? width <= 600
        ? '0%'
        : '-5%'
      : width <= 600
      ? '50%'
      : '-5%',
    left: loginState.newUser ? '0%' : width <= 600 ? '0%' : '50%',
  });

  // fading animation for error messages
  const transitions = useTransition(loginState.errorMessage, (item) => item, {
    from: {
      opacity: 0,
      color: 'white',
      transform: 'translate(0px,200px)',
    },
    enter: { opacity: 1, color: 'red', transform: 'translate(0px,0px)' },
    leave: {
      opacity: 0,
      transform: 'translate(200px,0px)',
    },
  });

  // Helpers
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Form Component Hooks
  const verifyInput = (value, type) => {
    switch (type) {
      case 'email':
        return value.length >= 8 && validateEmail(value);
      case 'password':
        return value.length >= 8;
      default:
        console.log('nothing matched');
        return false;
    }
  };

  const onType = (value, type) => {
    dispatch({
      type: `${type}-update`,
      value: value,
      ready: verifyInput(value, type),
    });
  };

  // Login Action Handlers
  const handleSignIn = (e, type) => {
    switch (type) {
      case 'new':
        console.log('This is a new user sign in');
        dispatch({ type: 'start-singIn' });
        auth
          .createUserWithEmailAndPassword(
            loginState.email.value,
            loginState.password.value
          )
          .then(() => {
            console.log('successfully made a new user');
            dispatch({ type: 'end-signIn' });
          })
          .catch(function (error) {
            const { message, code } = error;

            dispatch({
              type: 'error',
              message,
              code,
            });
          });

        break;
      case 'signIn':
        console.log('This is an existing user sign in');
        dispatch({ type: 'start-signIn' });
        auth
          .signInWithEmailAndPassword(
            loginState.email.value,
            loginState.password.value
          )
          .then(() => {
            console.log('Successgully Signed in');
            dispatch({ type: 'end-signIn' });
          })
          .catch(function (error) {
            // Handle Errors here.
            const { message, code } = error;

            dispatch({
              type: 'error',
              message,
              code,
            });
          });
        break;
      case 'google':
        console.log('This is an existing google user sign in');
        break;
      default:
        console.log('Type was not correctly identified');
    }
  };

  const handleSignOut = (e) => {
    auth
      .signOut()
      .then(function () {
        console.log('Successfully signed out');
      })
      .catch(function (error) {
        console.log('Encountered issues shutting down');
        console.log(error);
        // An error happened.
      });
  };

  return (
    <div className='outer-box'>
      <div className='outer-left'>
        <h2>Log In </h2>
        <p>Please provide your login credentials</p>
        <ButtonGroup>
          <Button
            onClick={() => {
              dispatch({ type: 'new-user' });
            }}>
            Dont have an account?
          </Button>
        </ButtonGroup>
      </div>
      <div className='outer-right'>
        <h2>Create an account</h2>
        <p>Come join us!</p>
        <ButtonGroup>
          <Button
            onClick={() => {
              dispatch({ type: 'old-user' });
            }}>
            Already have an account
          </Button>
        </ButtonGroup>
      </div>
      <animated.div className='inner-content' style={springStyles}>
        <Form className='form'>
          <InputGroup>
            <Input
              onVerify={verifyInput}
              onType={onType}
              label='Email'
              type='email'
            />
            <Input
              onVerify={verifyInput}
              onType={onType}
              label='Password'
              type='password'
            />
          </InputGroup>
          <ButtonGroup>
            <Button
              disable={!loginState.email.ready || !loginState.password.ready}
              loading={loginState.loading}
              onClick={(e) => {
                return loginState.newUser
                  ? handleSignIn(e, 'new')
                  : handleSignIn(e, 'signIn');
              }}>
              Submit
            </Button>
            {/* <Button onClick={handleSignOut}>Sign out</Button> */}
            <Button
              onClick={() => {
                loginState.loading
                  ? dispatch({ type: 'end-signIn' })
                  : dispatch({ type: 'start-signIn' });
              }}>
              Loading
            </Button>
          </ButtonGroup>
          <div className='error-container'>
            {transitions.map(
              ({ item, key, props }) =>
                item && (
                  <animated.p className='error-message' key={key} style={props}>
                    {item}
                  </animated.p>
                )
            )}
          </div>
        </Form>
      </animated.div>
    </div>
  );
};

export default React.memo(Login);
