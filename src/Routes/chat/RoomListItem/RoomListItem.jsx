import React from 'react';
import styles from './RoomListItem.module.scss';

const RoomListItem = (props) => {
  const { room } = props;
  let ownerName;

  if (room.owner && room.owner.name) {
    ownerName = room.owner.name.slice(0, 4);
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.imgContainer}>
        <p className={styles.imgText}>{ownerName}</p>
      </div>
      <p className={styles.chatText}>{room.name}</p>
    </div>
  );
};

const MemoizedRoomListItem = React.memo(RoomListItem);

export default MemoizedRoomListItem;
