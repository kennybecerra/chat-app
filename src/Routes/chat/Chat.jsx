import React from 'react';
import Layout from '../../HOC/Layout/Layout';
import ChatView from './ChatView/ChatView';
import RoomCreateView from './RoomCreateView/RoomCreateView';
import RoomsView from './RoomsView/RoomsView';
import RoomView from './RoomView/RoomView';
import RoomUpdateView from './RoomUpdateView/RoomUpdateView';
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
      <div className={styles.menu}>
        <div className={styles.iconContainer}>
          <Icon name='search' className={styles.menuIcon} />
        </div>
        <div
          className={styles.iconContainer}
          onClick={() => {
            history.push(`${path}/roomCreate`);
          }}>
          <Icon name='add-solid' className={styles.menuIcon} />
        </div>
        <div
          className={styles.iconContainer}
          onClick={() => {
            history.push(`${path}`);
          }}>
          <Icon name='heart-solid' className={styles.menuIcon} />
        </div>
        <div
          className={styles.iconContainer}
          onClick={() => {
            history.push(`${path}/rooms`);
          }}>
          <Icon name='list2' className={styles.menuIcon} />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
