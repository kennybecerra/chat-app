import {
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAILURE,
  ALL_ROOMS_RETRIEVE_REQUEST,
  ALL_ROOMS_RETRIEVE_SUCCESS_CACHE,
  ALL_ROOMS_RETRIEVE_SUCCESS_SERVER,
  ALL_ROOMS_RETRIEVE_FAILURE,
} from '../actions';

const initialState = {
  isCreatingRoom: false,
  roomCreatedSuccess: false,
  roomCreatedFailure: false,
  isRetrievingAllRooms: false,
  retrievingAllRoomsSuccess: false,
  retrievingAllRoomsFailure: false,
  lastRetrieval: null,
  allRooms: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROOM_CREATE_REQUEST:
      return {
        ...state,
        isCreatingRoom: true,
      };
    case ROOM_CREATE_SUCCESS:
      return {
        ...state,
        isCreatingRoom: false,
        roomCreatedSuccess: true,
        roomCreatedFailure: false,
      };
    case ROOM_CREATE_FAILURE:
      return {
        ...state,
        isCreatingRoom: false,
        roomCreatedSuccess: false,
        roomCreatedFailure: true,
      };
    case ALL_ROOMS_RETRIEVE_REQUEST:
      return {
        ...state,
        isRetrievingAllRooms: true,
      };
    case ALL_ROOMS_RETRIEVE_SUCCESS_CACHE:
      return {
        ...state,
        isRetrievingAllRooms: false,
        retrievingAllRoomsSuccess: true,
        retrievingAllRoomsFailure: false,
        allRooms: action.payload,
      };
    case ALL_ROOMS_RETRIEVE_SUCCESS_SERVER:
      return {
        ...state,
        isRetrievingAllRooms: false,
        retrievingAllRoomsSuccess: true,
        retrievingAllRoomsFailure: false,
        allRooms: action.payload,
        lastRetrieval: new Date().toISOString(),
      };
    case ALL_ROOMS_RETRIEVE_FAILURE:
      return {
        ...state,
        isRetrievingAllRooms: false,
        retrievingAllRoomsSuccess: false,
        retrievingAllRoomsFailure: true,
      };
    default:
      return state;
  }
};
