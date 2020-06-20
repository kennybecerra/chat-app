import React, { useEffect, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import RoomListItem from '../RoomListItem/RoomListItem';
import Icon from '../../../components/UI/Icon/Icon';
import { fireStore } from '../../../firebase/firebase.utils';
import styles from './RoomsView.module.scss';

const RoomsView = (props) => {
  const [rooms, updateRoom] = useState([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    fireStore
      .collection('Rooms')
      .get()
      .then((querySnapshot) => {
        let roomsTemp = querySnapshot.docs.map((room) => {
          return { id: room.id, ...room.data() };
        });
        updateRoom(roomsTemp);
      });
  }, []);

  const handleChange = (e) => {
    setTextInput(e.currentTarget.value);
  };

  const roomsFilter = (room) => {
    let regExp = new RegExp(textInput, 'gi');
    return textInput.length > 0
      ? regExp.test(room.name) | regExp.test(room.description)
      : true;
  };

  return (
    <>
      <div className={styles.nav}>
        <h2 className={styles.navHeader}>All Available rooms</h2>
      </div>
      <form
        className={styles.search}
        onSubmit={(e) => {
          e.preventDefault();
          handleChange(e);
        }}>
        <label htmlFor='searchYourChats' className={styles.inputContainer}>
          <input
            type='text'
            className={styles.input}
            name='searchYourChats'
            id='searchYourChats'
            placeholder='Search'
            onChange={handleChange}
            value={textInput}
          />
          <Icon name='search' className={styles.icon} />
        </label>
      </form>
      <div className={`${styles.myChats} os-host-flexbox`}>
        <OverlayScrollbarsComponent
          style={{ width: '100%', minHeight: '100%' }}
          options={{
            scrollbars: { autoHide: 'scroll' },
            sizeAutoCapable: true,
          }}>
          {rooms.filter(roomsFilter).map((room) => {
            return <RoomListItem key={room.id} room={room} />;
          })}
        </OverlayScrollbarsComponent>
      </div>
    </>
  );
};

export default RoomsView;
