import { combineReducers } from 'redux';
import auth from './auth';

// combine all slices of state
export default combineReducers({ auth });