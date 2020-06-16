import React, { useEffect, useRef } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { isAuthenticated, isVerifying, ...rest } = props;
  const history = useHistory();
  const prevPage = useRef(history.location.pathname);
  // TODO, protected page renders 2 times , this causes an issue when redirecting and sending
  // const prevPage = useRef(location.pathname);

  useEffect(() => {
    if (!isVerifying && !isAuthenticated) {
      history.replace('/login', { from: prevPage.current });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isVerifying]);

  return isVerifying ? <div /> : isAuthenticated ? <Route {...rest} /> : null;
};

export default ProtectedRoute;
