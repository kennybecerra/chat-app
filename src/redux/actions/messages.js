import { fireStore, firebase } from '../../firebase/firebase.utils';

export const MESSAGE_REQUEST = 'MESSAGE_REQUEST';
export const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';
export const MESSAGE_FAILURE = 'MESSAGE_FAILURE';

export const ALL_MESSAGES_REQUEST = 'ALL_MESSAGES_REQUEST';
export const ALL_MESSAGES_SUCCESS = 'ALL_MESSAGES_SUCCESS';
export const ALL_MESSAGES_FAILURE = 'ALL_MESSAGES_FAILURE';

export const CREATE_NEW_MESSAGE_REQUEST = 'CREATE_NEW_MESSAGE_REQUEST';
export const CREATE_NEW_MESSAGE_SUCCESS = 'CREATE_NEW_MESSAGE_SUCCESS';
export const CREATE_NEW_MESSAGE_FAILURE = 'CREATE_NEW_MESSAGE_FAILURE';

const getMesageRequest = () => {
  return {
    type: MESSAGE_REQUEST,
  };
};

const getMesageSuccess = (message) => {
  return {
    type: MESSAGE_SUCCESS,
    payload: message,
  };
};

const getMesageFailure = () => {
  return {
    type: MESSAGE_FAILURE,
  };
};

const createMesageRequest = () => {
  return {
    type: CREATE_NEW_MESSAGE_REQUEST,
  };
};

const createtMesageSuccess = (message) => {
  return {
    type: CREATE_NEW_MESSAGE_SUCCESS,
    payload: message,
  };
};

const createMesageFailure = () => {
  return {
    type: CREATE_NEW_MESSAGE_FAILURE,
  };
};

export const createNewMessage = (roomID, message) => {
  return async (dispatch, getState) => {
    dispatch(createMesageRequest());
    try {
      const docref = await fireStore
        .collection('Rooms')
        .doc(roomID)
        .collection('messages')
        .add({
          ...message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      dispatch(createtMesageSuccess());
    } catch (err) {
      console.log('error creating new message');
      dispatch(createMesageFailure());
      new Error(err);
    }
  };
};
