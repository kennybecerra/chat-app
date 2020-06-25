import React, { useEffect, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import RoomListItem from '../RoomListItem/RoomListItem';
import Icon from '../../../components/UI/Icon/Icon';
import * as actionCreators from '../../../redux/actions';
import { connect } from 'react-redux';
import styles from './RoomsView.module.scss';

const RoomsView = (props) => {
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    props.retrieveAllRooms();
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
          {props.allRooms.filter(roomsFilter).map((room) => {
            return <RoomListItem key={room.uid} room={room} />;
          })}
        </OverlayScrollbarsComponent>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allRooms: state.rooms.allRooms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveAllRooms: () => dispatch(actionCreators.retrieveAllRooms()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsView);
