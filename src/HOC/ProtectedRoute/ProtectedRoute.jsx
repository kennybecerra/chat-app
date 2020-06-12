import React, { useEffect, useRef } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, isVerifying, ...rest }) => {
  const location = useLocation();
  // TODO, protected page renders 2 times , this causes an issue when redirecting and sending 
  const prevPage = useRef(location.pathname);

  return isVerifying ? (
    <div />
  ) : isAuthenticated ? (
    <Route {...rest} />
  ) : (
    <Redirect
      push
      to={{
        state: { from: prevPage.current },
        pathname: '/login',
      }}
    />
  );
};

export default ProtectedRoute;
