import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.utils';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext();

const Authenticate = (props) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setLoggedIn(user);
        const prevPage = history.location.state && history.location.state.from;
        history.push(prevPage);
      } else {
        console.log('user logged out, or is not logged in');
        if (loggedIn) setLoggedIn(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={loggedIn}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { Authenticate, AuthContext };
