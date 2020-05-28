import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';

const ProtectedRoute = ({ children, ...rest }) => {
  const loggedIn = useContext(AuthContext);

  const { pathname } = useLocation();

  return loggedIn ? (
    <Route {...rest}> {children} </Route>
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: pathname },
      }}
    />
  );
};

export default ProtectedRoute;
