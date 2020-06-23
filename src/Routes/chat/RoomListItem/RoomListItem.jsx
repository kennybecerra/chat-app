import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RoomListItem.module.scss';

const RoomListItem = ({ room, showUpdateButton }) => {
  const history = useHistory();
  let ownerName;

  if (room.owner && room.owner.name) {
    ownerName = room.owner.name.slice(0, 4);
  }

  const handleChatClick = () => {
    history.push(`/chat/room/${room.uid}`);
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    history.push(`/chat/roomUpdate/${room.uid}`);
  };

  return (
    <div className={styles.chatContainer} onClick={handleChatClick}>
      <div className={styles.imgContainer}>
        <p className={styles.imgText}>{ownerName}</p>
      </div>
      <p className={styles.chatText}>
        {room.name.length > 15 ? `${room.name.slice(0, 15)}...` : room.name}
      </p>
      {showUpdateButton && (
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

const MemoizedRoomListItem = React.memo(RoomListItem);

export default MemoizedRoomListItem;
