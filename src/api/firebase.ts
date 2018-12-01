import * as dotenv from 'dotenv';
import * as firebase from 'firebase';

dotenv.config();

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
};

firebase.initializeApp(config);
firebase.auth().signInAnonymously()
  .catch(err => console.error(err));

const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, db, storage };