// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

// replace with YOUR firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyAmSOU2wUQyF3mKNfR_H24VS5OgEM0YOE4",
  authDomain: "foodshare-d7850.firebaseapp.com",
  projectId: "foodshare-d7850",
  storageBucket: "foodshare-d7850.firebasestorage.app",
  messagingSenderId: "1028160739189",
  appId: "1:1028160739189:web:30f8473089ef47d970653c",
  measurementId: "G-BCW5V67SKX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging?.(app); // optional (may throw in some envs) — use only if you plan FCM
export default app;
