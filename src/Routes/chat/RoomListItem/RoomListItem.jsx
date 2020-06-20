import React from 'react';
import styles from './RoomListItem.module.scss';

const RoomListItem = (props) => {
  const { room } = props;

  return (
    <div className={styles.chatContainer}>
      <div className={styles.imgContainer}>
        <p className={styles.imgText}>{room.owner[0].name.slice(0, 4)}</p>
      </div>
      <p className={styles.chatText}>{room.name}</p>
    </div>
  );
};

const MemoizedRoomListItem = React.memo(RoomListItem);

export default MemoizedRoomListItem;
