import React, { useEffect, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Message from './Message/Message';
import { fireStore } from '../../../firebase/firebase.utils';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../../redux/actions';
import styles from './RoomView.module.scss';

const RoomView = (props) => {
  const fakeData = [
    {
      name: 'kenny',
      text: 'Welll hello there',
    },
  ];

  const [inputText, setInputText] = useState('');

  const { roomID } = useParams();

  useEffect(() => {
    console.log('Component Did Mount');

    fireStore
      .collection('Rooms')
      .doc(roomID)
      .collection('messages')
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        console.log(querySnapshot.docs);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, []);

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.createNewMessage(roomID, {
      text: inputText,
    });
  };

  return (
    <>
      <div className={styles.nav}>
        <h2 className={styles.navHeader}>Update Chat</h2>
      </div>
      <div className={`${styles.chatContainer} os-host-flexbox`}>
        <OverlayScrollbarsComponent
          style={{ width: '100%', height: '100%' }}
          options={{
            scrollbars: { autoHide: 'scroll' },
            sizeAutoCapable: true,
          }}>
          {fakeData.map((message, index) => {
            return <Message key={index} {...message} />;
          })}
        </OverlayScrollbarsComponent>
      </div>
      <form className={styles.form}>
        <input
          type='text'
          className={styles.input}
          onChange={handleInput}
          value={inputText}
        />
        <button className={styles.btn}>send</button>
      </form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewMessage: (roomID, message) =>
      dispatch(actionCreators.createNewMessage(roomID, message)),
  };
};

export default connect(undefined, mapDispatchToProps)(RoomView);
