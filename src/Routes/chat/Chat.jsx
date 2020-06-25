import React from 'react';
import Layout from '../../HOC/Layout/Layout';
import ChatView from './ChatView/ChatView';
import RoomCreateView from './RoomCreateView/RoomCreateView';
import RoomsView from './RoomsView/RoomsView';
import RoomView from './RoomView/RoomView';
import RoomUpdateView from './RoomUpdateView/RoomUpdateView';
import ChatMenu from './ChatMenu/ChatMenu';
import { Switch, Route } from 'react-router-dom';
import styles from './Chat.module.scss';
import Icon from '../../components/UI/Icon/Icon';

const Chat = (props) => {
  const { history } = props;
  const { path } = props.match;

  return (
    <Layout>
      <div className={styles.blob}></div>
      <Switch>
        <Route exact path={`${path}/rooms`}>
          <RoomsView />
        </Route>
        <Route exact path={`${path}/room/:roomID`}>
          <RoomView />
        </Route>
        <Route exact path={`${path}/roomUpdate/:roomID`}>
          <RoomUpdateView />
        </Route>
        <Route exact path={`${path}/roomCreate`}>
          <RoomCreateView />
        </Route>
        <Route exact path={path}>
          <ChatView />
        </Route>
      </Switch>
      <ChatMenu />
    </Layout>
  );
};

export default Chat;
