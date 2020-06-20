import {
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAILURE,
} from '../actions';

const initialState = {
  isCreatingRoom: false,
  roomCreatedSuccess: false,
  roomCreatedFailure: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROOM_CREATE_REQUEST:
      return {
        ...state,
        isCreatingRoom: true,
      };
      break;
    case ROOM_CREATE_SUCCESS:
      return {
        ...state,
        isCreatingRoom: false,
        roomCreatedSuccess: true,
        roomCreatedFailure: false,
      };
      break;
    case ROOM_CREATE_FAILURE:
      return {
        ...state,
        isCreatingRoom: false,
        roomCreatedSuccess: false,
        roomCreatedFailure: true,
      };
      break;
    default:
      return state;
  }
};
