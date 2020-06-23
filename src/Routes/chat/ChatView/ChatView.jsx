import React from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import RoomListItem from '../RoomListItem/RoomListItem';
import { connect } from 'react-redux';
import Icon from '../../../components/UI/Icon/Icon';
import styles from './ChatView.module.scss';

const ChatView = (props) => {
  return (
    <>
      <div className={styles.nav}>
        <h2 className={styles.navHeader}>Your chats</h2>
      </div>
      <div className={styles.search}>
        <label htmlFor='searchYourChats' className={styles.inputContainer}>
          <input
            type='text'
            className={styles.input}
            name='searchYourChats'
            id='searchYourChats'
            placeholder='Search'
          />
          <Icon name='search' className={styles.icon} />
        </label>
      </div>
      <div className={`${styles.myChats} os-host-flexbox`}>
        <OverlayScrollbarsComponent
          style={{ width: '100%', minHeight: '100%' }}
          options={{
            scrollbars: { autoHide: 'scroll' },
            sizeAutoCapable: true,
          }}>
          {props.userInfo.rooms.map((room) => {
            return <RoomListItem key={room.uid} room={room} showUpdateButton />;
          })}
        </OverlayScrollbarsComponent>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps)(ChatView);
