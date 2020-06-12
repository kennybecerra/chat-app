import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/auth';

const Session = (props) => {
  return props.children;
};

export default Session;
