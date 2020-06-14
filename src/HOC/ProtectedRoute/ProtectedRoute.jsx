import React, { useEffect } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { isAuthenticated, isVerifying, ...rest } = props;
  const location = useLocation();
  const history = useHistory();
  // TODO, protected page renders 2 times , this causes an issue when redirecting and sending
  // const prevPage = useRef(location.pathname);

  useEffect(() => {
    if (!isVerifying && !isAuthenticated) {
      history.push('/login', { from: location.pathname });
    }
  }, [history, isAuthenticated, isVerifying, location.pathname]);

  return isVerifying ? <div /> : isAuthenticated ? <Route {...rest} /> : null;
};

export default ProtectedRoute;
