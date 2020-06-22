import React, { useReducer } from 'react';
import Icon from '../../../components/UI/Icon/Icon';
import { connect } from 'react-redux';
import * as actionCreators from '../../../redux/actions';
import styles from './RoomCreateView.module.scss';

const initialState = {
  private: false,
  name: '',
  description: '',
  color: '#000000',
  password: '',
  ready: false,
};

const reducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case 'UPDATE_PRIVACY':
      newState.private = action.payload;
      break;
    case 'UPDATE_NAME':
      newState.name = action.payload;
      break;
    case 'UPDATE_DESCRIPTION':
      newState.description = action.payload;
      break;
    case 'UPDATE_COLOR':
      newState.color = action.payload;
      break;
    case 'UPDATE_PASSWORD':
      newState.password = action.payload;
      break;
    default:
      break;
  }

  if (
    newState.name.length > 0 &&
    newState.description.length > 0 &&
    newState.color.length > 0 &&
    ((newState.private && newState.password.length > 0) || !newState.private)
  ) {
    newState.ready = true;
  } else {
    newState.ready = false;
  }

  return newState;
};

const RoomCreateView = (props) => {
  const [chatDetails, setChatDetails] = useReducer(reducer, initialState);

  const handleInput = (e) => {
    setChatDetails({
      type: `UPDATE_${e.target.name.toUpperCase()}`,
      payload: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit ran');
    props.createNewRoom(chatDetails);
  };

  return (
    <>
      <div className={styles.nav}>
        <h2 className={styles.navHeader}>Create Chat</h2>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.privacy}>
          <div
            className={`${styles.private} ${
              chatDetails.private && styles.active
            }`}
            onClick={() => {
              setChatDetails({ type: 'UPDATE_PRIVACY', payload: true });
            }}>
            <Icon name='lock' className={styles.icon} />
            <p className={styles.text}>private</p>
          </div>
          <div
            className={`${styles.public} ${
              !chatDetails.private && styles.active
            }`}
            onClick={() => {
              setChatDetails({ type: 'UPDATE_PRIVACY', payload: false });
            }}>
            <Icon name='unlock' className={styles.icon} />
            <p className={styles.text}>public</p>
          </div>
        </div>
        <div className={styles.settings}>
          <div className={styles.inputContainer}>
            <label htmlFor='name' className={styles.label}>
              Chat Name
            </label>
            <input
              type='text'
              name='name'
              className={styles.input}
              placeholder='Name your chat'
              onChange={handleInput}
              value={chatDetails.name}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='description' className={styles.label}>
              Description
            </label>
            <input
              type='text'
              name='description'
              className={styles.input}
              onChange={handleInput}
              value={chatDetails.description}
            />
          </div>
          {chatDetails.private && (
            <div className={styles.inputContainer}>
              <label htmlFor='name' className={styles.label}>
                Password
              </label>
              <input
                type='text'
                name='password'
                className={styles.input}
                placeholder='secret'
                onChange={handleInput}
                value={chatDetails.password}
              />
            </div>
          )}
          <div className={styles.inputContainer}>
            <label htmlFor='color' className={styles.label}>
              Color
            </label>
            <input
              type='color'
              name='color'
              className={styles.input}
              onChange={handleInput}
              value={chatDetails.color}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              disabled={!chatDetails.ready}
              className={`${styles.button} ${
                !chatDetails.ready && styles.buttonDisable
              }`}>
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const mapDispatchToprops = (dispatch) => {
  return {
    createNewRoom: (chatDetails) => {
      return dispatch(actionCreators.createNewRoom(chatDetails));
    },
  };
};

export default connect(undefined, mapDispatchToprops)(RoomCreateView);
