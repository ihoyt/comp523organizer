import authReducer from './authReducer';
import proposalReducer from './proposalReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  proposal: proposalReducer,
  firestore: firestoreReducer
});

export default rootReducer;
