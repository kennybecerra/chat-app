import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// settings
firebase.initializeApp(config);

// enabled persistance
firebase
  .firestore()
  .enablePersistence()
  .then((success) => {
    console.log('Successfully added persistance');
  })
  .catch((err) => {
    console.log('Failed to enable Persistance');
  });

export const fireStore = firebase.firestore();
export const auth = firebase.auth();
export { firebase };
