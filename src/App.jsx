import React, { useCallback } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from './Routes/Home/Home';
import Chat from './Routes/Chat/Chat';
import Game from './Routes/Game';
import Library from './Routes/Library';
import Media from './Routes/Media';
import Login from './Routes/Login/Login';
import ProtectedRoute from './HOC/ProtectedRoute/ProtectedRoute';
import { connect } from 'react-redux';
import './App.scss';
import { useTransition, animated, config } from 'react-spring';

function App({ isAuthenticated, isVerifying }) {
  const location = useLocation();

  // Route Transition Helper
  const routeFadeDirection = useCallback((currentLocation) => {
    let styleObj = {
      opacity: 0,
    };

    switch (currentLocation.pathname) {
      case '/chat':
        styleObj.transform = `translate(100%, 0)`;
        break;
      case '/game':
        styleObj.transform = `translate(0, -100%)`;
        break;
      case '/library':
        styleObj.transform = `translate(0, 100%)`;
        break;
      case '/media':
        styleObj.transform = `translate(-100%, 0)`;
        break;
      default:
        styleObj.transform = `translate(0, 0)`;
    }

    return styleObj;
  }, []);

  const transitions = useTransition(location, (location) => location.pathname, {
    from: (currentLocation) => {
      return routeFadeDirection(currentLocation);
    },
    enter: (currentLocation) => {
      return {
        opacity: 1,
        transform: `translate(0%,0%)`,
      };
    },
    leave: (currentLocation) => {
      return routeFadeDirection(currentLocation.pathname);
    },
    config: config.slow,
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div className='container' key={key} style={props}>
      <Switch location={item}>
        <ProtectedRoute
          exact
          path='/media'
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          component={Media}
        />
        <ProtectedRoute
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
