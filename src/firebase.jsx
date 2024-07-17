// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-sbBzV-Tr9cn9iDJmUZ5eV_v60in3EHc",
  authDomain: "chatty-f04ab.firebaseapp.com",
  projectId: "chatty-f04ab",
  storageBucket: "chatty-f04ab.appspot.com",
  messagingSenderId: "1017825768555",
  appId: "1:1017825768555:web:d96479195f2f9a3ca82d2e",
  measurementId: "G-S58FPT4MFP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
export const storage = getStorage();
