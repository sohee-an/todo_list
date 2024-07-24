// firebaseConfig.ts
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

class FirebaseSingleton {
  private static instance: FirebaseSingleton;
  public app: FirebaseApp;
  public auth: Auth;
  public db: Firestore;

  private constructor() {
    this.app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  public static getInstance(): FirebaseSingleton {
    if (!FirebaseSingleton.instance) {
      FirebaseSingleton.instance = new FirebaseSingleton();
    }
    return FirebaseSingleton.instance;
  }
}

const firebaseInstance = FirebaseSingleton.getInstance();

export const app = firebaseInstance.app;
export const auth = firebaseInstance.auth;
export const db = firebaseInstance.db;
