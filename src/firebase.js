// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmSOU2wUQyF3mKNfR_H24VS5OgEM0YOE4",
  authDomain: "foodshare-d7850.firebaseapp.com",
  projectId: "foodshare-d7850",
  storageBucket: "foodshare-d7850.appspot.com",
  messagingSenderId: "1028160739189",
  appId: "1:1028160739189:web:30f8473089ef47d970653c",
  measurementId: "G-BCW5V67SKX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
