import {
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAILURE,
  ALL_ROOMS_RETRIEVE_REQUEST,
  ALL_ROOMS_RETRIEVE_SUCCESS_CACHE,
  ALL_ROOMS_RETRIEVE_SUCCESS_SERVER,
  ALL_ROOMS_RETRIEVE_FAILURE,
  ROOM_RETRIEVE_REQUEST,
  ROOM_RETRIEVE_SUCCESS,
  ROOM_RETRIEVE_FAILURE,
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_SUCCESS,
  ROOM_UPDATE_FAILURE,
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
  isRetrievingRoom: false,
  retrievingRoomSuccess: false,
  retrievingRoomFailure: false,
  room: null,
  isUpdatingRoom: false,
  UpdatingRoomSuccess: false,
  UpdatingRoomFailure: false,
  error: null,
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
    case ROOM_RETRIEVE_REQUEST:
      return {
        ...state,
        isRetrievingRoom: true,
      };
    case ROOM_RETRIEVE_SUCCESS:
      return {
        ...state,
        isRetrievingRoom: false,
        retrievingRoomSuccess: true,
        retrievingRoomFailure: false,
        room: action.payload,
      };
    case ROOM_RETRIEVE_FAILURE:
      return {
        ...state,
        isRetrievingRoom: false,
        retrievingRoomSuccess: false,
        retrievingRoomFailure: true,
        error: action.payload,
      };
    case ROOM_UPDATE_REQUEST:
      return {
        ...state,
        isUpdatingRoom: true,
      };
    case ROOM_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdatingRoom: false,
        UpdatingRoomSuccess: true,
        UpdatingRoomFailure: false,
        room: action.payload,
      };
    case ROOM_UPDATE_FAILURE:
      return {
        ...state,
        isUpdatingRoom: false,
        UpdatingRoomSuccess: false,
        UpdatingRoomFailure: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
