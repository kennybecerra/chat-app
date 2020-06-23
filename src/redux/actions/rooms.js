import { fireStore, firebase } from '../../firebase/firebase.utils';

export const ROOM_CREATE_REQUEST = 'ROOM_CREATE_REQUEST';
export const ROOM_CREATE_SUCCESS = 'ROOM_CREATE_SUCCESS';
export const ROOM_CREATE_FAILURE = 'ROOM_CREATE_FAILURE';

export const ALL_ROOMS_RETRIEVE_REQUEST = 'ALL_ROOMS_RETRIEVE_REQUEST';
export const ALL_ROOMS_RETRIEVE_SUCCESS_CACHE =
  'ALL_ROOMS_RETRIEVE_SUCCESS_CACHE';
export const ALL_ROOMS_RETRIEVE_SUCCESS_SERVER =
  'ALL_ROOMS_RETRIEVE_SUCCESS_SERVER';
export const ALL_ROOMS_RETRIEVE_FAILURE = 'ALL_ROOMS_RETRIEVE_FAILURE';

export const ROOM_RETRIEVE_REQUEST = 'ROOM_RETRIEVE_REQUEST';
export const ROOM_RETRIEVE_SUCCESS = 'ROOM_RETRIEVE_SUCCESS';
export const ROOM_RETRIEVE_FAILURE = 'ROOM_RETRIEVE_FAILURE';

export const ROOM_UPDATE_REQUEST = 'ROOM_UPDATE_REQUEST';
export const ROOM_UPDATE_SUCCESS = 'ROOM_UPDATE_SUCCESS';
export const ROOM_UPDATE_FAILURE = 'ROOM_UPDATE_FAILURE';

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
  return async (dispatch, getState) => {
    dispatch(roomCreateRequest());
    const { auth } = getState();

    try {
      let docRef = await fireStore.collection('Rooms').add({
        ...chatDetails,
        owner: {
          name: auth.user.displayName,
          email: auth.user.email,
          uid: auth.user.uid,
        },
        participants: [
          {
            name: auth.user.displayName,
            email: auth.user.email,
            uid: auth.user.uid,
          },
        ],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      });
      await fireStore
        .collection('users')
        .doc(auth.user.uid)
        .update({
          rooms: firebase.firestore.FieldValue.arrayUnion({
            name: chatDetails.name,
            description: chatDetails.description,
            uid: docRef.id,
          }),
        });
      dispatch(roomCreateSuccess());
    } catch (err) {
      dispatch(roomCreateFailure());
      console.log('Error creating Room');
      throw new Error(err);
    }
  };
};

const allRoomsRetrieveRequest = () => {
  return {
    type: ALL_ROOMS_RETRIEVE_REQUEST,
  };
};

const allRoomsRetrieveSuccessCache = (rooms) => {
  return {
    type: ALL_ROOMS_RETRIEVE_SUCCESS_CACHE,
    payload: rooms,
  };
};

const allRoomsRetrieveSuccessServer = (rooms) => {
  return {
    type: ALL_ROOMS_RETRIEVE_SUCCESS_SERVER,
    payload: rooms,
  };
};

const allRoomsRetrieveFailure = () => {
  return {
    type: ALL_ROOMS_RETRIEVE_FAILURE,
  };
};

export const retrieveAllRooms = () => {
  return async (dispatch, getState) => {
    dispatch(allRoomsRetrieveRequest());
    let lastRetrieval = Date.parse(getState().rooms.lastRetrieval);
    let now = Date.now();
    let options = {};

    // 1000 * 60 = 1 minute
    if (!isNaN(lastRetrieval) && now - lastRetrieval <= 60000 * 10) {
      options.source = 'cache';
      // console.log('Grabbed from cache');
    } else {
      options.source = 'default';
      // console.log('Grabbed from default');
    }

    try {
      let querySnapshot = await fireStore.collection('Rooms').get(options);
      let rooms = querySnapshot.docs.map((room) => {
        return { uid: room.id, ...room.data() };
      });
      if (options.source === 'cache') {
        dispatch(allRoomsRetrieveSuccessCache(rooms));
      } else {
        dispatch(allRoomsRetrieveSuccessServer(rooms));
      }
    } catch (err) {
      dispatch(allRoomsRetrieveFailure());
      console.log('An Error occured retrieving all the available rooms');
    }
  };
};

const roomRetrieveRequest = () => {
  return {
    type: ROOM_RETRIEVE_REQUEST,
  };
};

const roomRetrieveSuccess = (room) => {
  return {
    type: ROOM_RETRIEVE_SUCCESS,
    payload: room,
  };
};

const roomRetrieveFailure = (error) => {
  return {
    type: ROOM_RETRIEVE_FAILURE,
    payload: error,
  };
};

export const retrieveRoomInformation = (roomID) => {
  return async (dispatch, getState) => {
    dispatch(roomRetrieveRequest());

    try {
      let docRef = await fireStore.collection('Rooms').doc(roomID).get();
      if (docRef.exists) {
        dispatch(roomRetrieveSuccess(docRef.data()));
        return docRef.data();
      } else {
        dispatch(roomRetrieveFailure('File not Found'));
      }
    } catch (error) {
      dispatch(roomRetrieveFailure(error));
      new Error(error);
    }
  };
};

const roomUpdateRequest = () => {
  return {
    type: ROOM_UPDATE_REQUEST,
  };
};

const roomUpdateSuccess = () => {
  return {
    type: ROOM_UPDATE_SUCCESS,
  };
};

const roomUpdateFailure = (error) => {
  return {
    type: ROOM_UPDATE_FAILURE,
    payload: error,
  };
};

export const updateRoomInformation = (roomID, roomInfo) => {
  return async (dispatch, getState) => {
    dispatch(roomUpdateRequest());

    try {
      await fireStore
        .collection('Rooms')
        .doc(roomID)
        .update({
          ...roomInfo,
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        });
      dispatch(roomUpdateSuccess());
    } catch (error) {
      dispatch(roomUpdateFailure(error));
      new Error(error);
    }
  };
};
