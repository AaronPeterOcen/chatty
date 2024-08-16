// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

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
export const storage = getStorage();

const signup = async (username, email, password) => {
  try {
    // Create a new user with the provided email and password
    const res = await createUserWithEmailAndPassword(email, password);
    const user = res.user; // Get the newly created user

    // Store the user's additional information in the "users" collection
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "", // Placeholder for user's real name
      avatar: "", // Placeholder for user's avatar
      bio: "Available", // Default bio
      lastSeen: Date.now(), // Timestamp of the user's last activity
    });

    // Initialize an empty chat document for the user in the "chats" collection
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [], // Placeholder for future chat data
    });
  } catch (error) {
    console.error(error); // Log any errors that occur during the signup process
    toast.error(error.code); // Display an error message to the user
  }
};

export { signup };
