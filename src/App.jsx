import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Routes/Home/Home';
import Chat from './Routes/chat/Chat';
import Game from './Routes/Game';
import Library from './Routes/Library';
import Media from './Routes/Media';
import Login from './Routes/login/Login';
import { Authenticate } from './HOC/Auth/Auth';
import ProtectedRoute from './HOC/ProtectedRoute/ProtectedRoute';
import './App.scss';

function App() {
  return (
    <Authenticate>
      <Switch>
        <ProtectedRoute exact path='/media'>
          <Media />
        </ProtectedRoute>
        <ProtectedRoute exact path='/chat'>
          <Chat />
        </ProtectedRoute>
        <ProtectedRoute exact path='/game'>
          <Game />
        </ProtectedRoute>
        <ProtectedRoute exact path='/library'>
          <Library />
        </ProtectedRoute>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Authenticate>
  );
}

export default App;
