import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

// Creates a Context object named AppContext.
// This will be used to share data across the component tree without passing props down manually at every level.
export const AppContext = createContext();

// The AppContextProvider component is defined here.
// This component will wrap around any components that need access to the context.
const AppContextProvider = (props) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  // const { chatsData } = useContext(firebase);

  // Function to load user info based on user ID (uid)
  const loadUserInfo = async (uid) => {
    try {
      // Reference to the user document in the database
      const userRef = doc(db, "users", uid);

      // Fetch the user document snapshot
      const userSnap = await getDoc(userRef);

      // Extract and log the user data
      const userData = userSnap.data();
      setUserData(userData); //storing the user data in the state var

      if (userData.avatar && userData.name) {
        // If the user has an avatar and a name, navigate to the chat page
        navigate("/chat");
      } else {
        // If the user doesn't have an avatar or name, navigate to the profile page
        navigate("/profile");
      }

      // Update the user's last seen time in the database
      await updateDoc(userRef, {
        lastSeen: Date.now(),
      });

      // Set an interval to update the user's last seen time every 20 minutes (1200000 ms)
      setInterval(async () => {
        if (auth.chatUser) {
          // If the user is still authenticated, update the last seen time
          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 120000); // 2 minutes in milliseconds
    } catch (error) {
      // Handle any errors
    }
  };

  useEffect(() => {
    // Check if userData is available before setting up the listener
    if (userData) {
      // Create a reference to the user's specific chat document in the 'chats' collection
      const chatRef = doc(db, "chats", userData.id);

      // Set up a real-time listener to the chat document to get updates whenever it changes
      const unSub = onSnapshot(chatRef, async (res) => {
        // Extract chat items data from the Firestore document's 'chatData' field
        const chatItems = res.data().chatsData;
        // console.log(chatItems);
        // Temporary array to hold processed chat data with user information
        const tempData = [];

        // Loop through each chat item to fetch additional user information
        for (const item in chatItems) {
          // Create a reference to the user document in the 'users' collection using item.rId
          const userRef = doc(db, "users", item.rId);

          // Fetch the user document snapshot
          const userSnap = await getDoc(userRef);

          // Extract user data from the snapshot
          const userData = userSnap.data();

          // Add the chat item to tempData array along with the fetched user data
          tempData.push({ ...item, userData });
        }

        // Update the component state with sorted chat data based on the 'updateAt' timestamp in descending order
        setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
      });

      // Cleanup function to unsubscribe from the Firestore listener when the component unmounts or userData changes
      return () => {
        unSub();
      };
    }
  }, [userData]); // The effect runs whenever userData changes

  // The value object represents the data that will be shared across the components that consume this context.
  //   you can add any state or functions here to be accessible globally.
  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserInfo,
  };

  return (
    <>
      {/* The Provider component makes the context value available to any components that are wrapped inside it */}
      <AppContext.Provider value={value}>
        {/* props.children refers to the child components that are wrapped by AppContextProvider */}
        {props.children}
      </AppContext.Provider>
    </>
  );
};

// Exports the AppContextProvider component to be used in other parts of the application.
export default AppContextProvider;
