import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.utils';
import { useEffect } from 'react';

const AuthContext = React.createContext();
let counter = 0;

const Authenticate = (props) => {
  const [loggedIn, setLoggedIn] = useState(null);

  // useEffect(() => {
  //   console.log('This ran once', counter);
  //   counter++;
  //   auth.onAuthStateChanged(function (user) {
  //     if (user) {
  //       setLoggedIn(user);
  //       const prevPage = history.location.state && history.location.state.from;
  //       history.push(prevPage);
  //     } else {
  //       console.log('user logged out, or is not logged in');
  //       if (loggedIn) setLoggedIn(null);
  //     }
  //   });
  // }, []);

  return <>{props.children}</>;
};

export { Authenticate, AuthContext };
