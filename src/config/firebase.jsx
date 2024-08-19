// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCVShpk6oZj-t1bLIzC8V2SOuioi4HsyIw",
  authDomain: "chat-e3ca9.firebaseapp.com",
  projectId: "chat-e3ca9",
  storageBucket: "chat-e3ca9.appspot.com",
  messagingSenderId: "1020628028062",
  appId: "1:1020628028062:web:09793ade3c5f66f336c98f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);

const signup = async (username, email, password) => {
  try {
    // Create a new user with the provided email and password
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user; // Get the newly created user

    // Store the user's additional information in the "users" collection
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username,
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

    console.log("Documents successfully written!");
    // console.log(firebase.auth().user);
  } catch (error) {
    console.error(error); // Log any errors that occur during the signup process
    toast.error(error.code); // Display an error message to the user
  }
};

export { signup };
