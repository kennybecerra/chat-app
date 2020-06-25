import {
  // MESSAGE_REQUEST,
  // MESSAGE_SUCCESS,
  // MESSAGE_FAILURE,
  // ALL_MESSAGES_REQUEST,
  // ALL_MESSAGES_SUCCESS,
  // ALL_MESSAGES_FAILURE,
  CREATE_NEW_MESSAGE_REQUEST,
  CREATE_NEW_MESSAGE_SUCCESS,
  CREATE_NEW_MESSAGE_FAILURE,
} from '../actions';

const initialState = {
  isCreatingMessageRequest: false,
  isCreatingMessageSucess: false,
  isCreatingMessageFailure: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_MESSAGE_REQUEST:
      return {
        ...state,
        isCreatingMessageRequest: true,
      };
    case CREATE_NEW_MESSAGE_SUCCESS:
      return {
        ...state,
        isCreatingMessageRequest: false,
      };
    case CREATE_NEW_MESSAGE_FAILURE:
      return {
        ...state,
        isCreatingMessageRequest: false,
      };
    default:
      return state;
  }
};
