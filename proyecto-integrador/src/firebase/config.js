import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBmvbIbmIPHrjy14UEuqPjbcSeO0IZUR-s",
  authDomain: "proyecto-integrador-11f28.firebaseapp.com",
  projectId: "proyecto-integrador-11f28",
  storageBucket: "proyecto-integrador-11f28.firebasestorage.app",
  messagingSenderId: "97775532252",
  appId: "1:97775532252:web:b558c377aefe22daf0dc19"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();