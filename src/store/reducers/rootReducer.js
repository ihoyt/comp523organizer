import authReducer from './authReducer';
import proposalReducer from './proposalReducer';
import emailReducer from './emailReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  proposal: proposalReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  email: emailReducer
});

export default rootReducer;
