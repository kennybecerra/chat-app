import React from 'react';
import Icon from '../../../components/UI/Icon/Icon';
import { useHistory } from 'react-router-dom';
import styles from './ChatMenu.module.scss';

const ChatMenu = () => {
  const history = useHistory();
  return (
    <div className={styles.menu}>
      <div className={styles.iconContainer}>
        <Icon name='search' className={styles.menuIcon} />
      </div>
      <div
        className={styles.iconContainer}
        onClick={() => {
          history.push(`/chat/roomCreate`);
        }}>
        <Icon name='add-solid' className={styles.menuIcon} />
      </div>
      <div
        className={styles.iconContainer}
        onClick={() => {
          history.push(`/chat`);
        }}>
        <Icon name='heart-solid' className={styles.menuIcon} />
      </div>
      <div
        className={styles.iconContainer}
        onClick={() => {
          history.push(`/chat/rooms`);
        }}>
        <Icon name='list2' className={styles.menuIcon} />
      </div>
    </div>
  );
};

const MemoizedChatMenu = React.memo(ChatMenu);

export default MemoizedChatMenu;
