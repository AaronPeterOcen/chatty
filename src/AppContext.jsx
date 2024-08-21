import { doc, getDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "./config/firebase";

// Creates a Context object named AppContext.
// This will be used to share data across the component tree without passing props down manually at every level.
export const AppContext = createContext();

// The AppContextProvider component is defined here.
// This component will wrap around any components that need access to the context.
const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  // Function to load user info based on user ID (uid)
  const loadUserInfo = async (uid) => {
    try {
      // Reference to the user document in the database
      const userRef = doc(db, "users", uid);

      // Fetch the user document snapshot
      const userSnap = await getDoc(userRef);

      // Extract and log the user data
      const userData = userSnap.data();
      console.log(userData);

      // Optionally set the user data to state
      // setUserData(userData);
    } catch (error) {
      // Handle any errors
    }
  };

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
