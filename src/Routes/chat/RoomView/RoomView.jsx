import React, { useEffect } from 'react';
import styles from './RoomView.module.scss';

const RoomView = (props) => {
  return (
    <>
      <div className={styles.nav}>
        <h2 className={styles.navHeader}>Update Chat</h2>
      </div>
      <div className='chat-container os-host-flexbox'>something</div>
    </>
  );
};

export default RoomView;
