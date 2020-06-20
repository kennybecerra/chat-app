import { auth, fireStore } from '../../firebase/firebase.utils';

export const ROOM_CREATE_REQUEST = 'ROOM_CREATE_REQUEST';
export const ROOM_CREATE_SUCCESS = 'ROOM_CREATE_SUCCESS';
export const ROOM_CREATE_FAILURE = 'ROOM_CREATE_FAILURE';

// export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// export const VERIFY_REQUEST = 'VERIFY_REQUEST';
// export const VERIFY_SUCCESS_UPDATE = 'VERIFY_SUCCESS_UPDATE';
// export const VERIFY_SUCCESS_NO_UPDATE = 'VERIFY_SUCCESS_NO_UPDATE';

// export const UPDATE_USER_DETAILS = 'UPDATE_USER_CONFIG';

const roomCreateRequest = () => {
  return {
    type: ROOM_CREATE_REQUEST,
  };
};

const roomCreateSuccess = () => {
  return {
    type: ROOM_CREATE_SUCCESS,
  };
};

const roomCreateFailure = () => {
  return {
    type: ROOM_CREATE_FAILURE,
  };
};

export const createNewRoom = (chatDetails) => {
  return async (disaptch, getState) => {
    roomCreateRequest();

    try {
      let docRef = await fireStore.collection('Rooms').add({
        ...chatDetails,
        owner: {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
        },
        participants: [
          {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
          },
        ],
      });
      await fireStore
        .collection('users')
        .doc(auth.currentUser.uid)
        .update({
          rooms: fireStore.FieldValue.arrayUnion({
            name: chatDetails.name,
            description: chatDetails.description,
            uid: docRef.id,
          }),
        });
      roomCreateSuccess();
    } catch (err) {
      roomCreateFailure();
      console.log('Error creating Room');
      throw new Error(err);
    }
  };
};
