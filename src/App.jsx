import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Home from './Routes/Home/Home';
import Chat from './Routes/chat/Chat';
import Game from './Routes/Game';
import Library from './Routes/Library';
import Media from './Routes/Media';
import Login from './Routes/login/Login';
import ProtectedRoute from './HOC/ProtectedRoute/ProtectedRoute';
import { connect } from 'react-redux';
import './App.scss';
import { useTransition, animated } from 'react-spring';

function App({ isAuthenticated, isVerifying }) {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={item}>
        <ProtectedRoute
          exact
          path='/media'
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          component={Media}
        />
        <ProtectedRoute
          exact
          path='/chat'
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          component={Chat}
        />
        <ProtectedRoute
          exact
          path='/game'
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          component={Game}
        />

        <ProtectedRoute
          exact
          path='/library'
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          component={Library}
        />

        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='*'>
          <Home />
        </Route>
      </Switch>
    </animated.div>
  ));
}

const mapStateWithProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
};

export default connect(mapStateWithProps)(App);
