// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/auth';

import { getAnalytics } from 'firebase/analytics';
//
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBr4Z5bMDCXi8GShyIjZttb9-HmmzOx-po',
  authDomain: 'todo-list-12859.firebaseapp.com',
  projectId: 'todo-list-12859',
  storageBucket: 'todo-list-12859.appspot.com',
  messagingSenderId: '771600884891',
  appId: '1:771600884891:web:cd18147a40b52a64a1523e',
  measurementId: 'G-V7B75FJE77',
};

// Initialize Firebase

// firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app) // Firestore 인스턴스를 가져옵니다.
// const auth = getAuth(app);

export { app };
// export { app, db, auth,  };
