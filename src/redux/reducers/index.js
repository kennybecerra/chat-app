import { combineReducers } from 'redux';
import auth from './auth';
import rooms from './rooms';

// combine all slices of state
export default combineReducers({ auth, rooms });
