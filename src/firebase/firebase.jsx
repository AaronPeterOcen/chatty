// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzl_73-JNClZL3dS8b42hyqvGntiQH4uQ",
  authDomain: "chatty-01-404a8.firebaseapp.com",
  projectId: "chatty-01-404a8",
  storageBucket: "chatty-01-404a8.appspot.com",
  messagingSenderId: "726118495243",
  appId: "1:726118495243:web:4097311c29063e8fbc430e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
// const analytics = getAnalytics(app);
export const storage = getStorage();
