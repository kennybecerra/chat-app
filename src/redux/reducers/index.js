import { combineReducers } from 'redux';
import auth from './auth';
import rooms from './rooms';
import messages from './messages';

// combine all slices of state
export default combineReducers({ auth, rooms, messages });
