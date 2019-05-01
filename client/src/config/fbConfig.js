import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDMjebIMz_DDau2JMhDS7mHcZIZ0_sXMZI",
    authDomain: "selo-c10fc.firebaseapp.com",
    databaseURL: "https://selo-c10fc.firebaseio.com",
    projectId: "selo-c10fc",
    storageBucket: "selo-c10fc.appspot.com",
    messagingSenderId: "293366956487"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true});

  export default firebase;
