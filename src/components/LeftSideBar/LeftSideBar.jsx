import React, { useContext, useState } from "react";
import "./LeftSideBar.css";
import chatLogo from "../../images/chat-sm.png";
import menuIcon from "../../images/ellipsis.png";
import searchIcon from "../../images/search.png";
import userImage from "../../images/bird.jpg";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from "../../AppContext";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const {
    userData,
    chatData,
    messagesId,
    setMessagesId,
    chatUser,
    setChatUser,
  } = useContext(AppContext); // Extracting user data from AppContext using React's useContext hook.
  const [user, setUser] = useState(null); // State to manage the user object found through search.
  const [showSearch, setShowSearch] = useState(false); // State to manage visibility of the search results or suggestions.

  const inputField = async (e) => {
    try {
      const input = e.target.value; // Getting the input value from the event's target.

      if (input) {
        setShowSearch(true); // Display search results if there is any input.

        const userRef = collection(db, "users"); // Reference to the 'users' collection in Firestore.
        const q = query(userRef, where("username", "==", input.toLowerCase())); // Create a Firestore query to find users with the username matching the input (case insensitive).

        const querySnap = await getDocs(q); // Execute the query and get the documents (users) that match the query.

        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          // If there are results and the first user's id is not the same as the current user's id:
          // checking if the user has already been added
          let userExist = false;
          chatData.map((user) => {
            if (user.rId === querySnap.docs[0].data().id) {
              userExist = true;
            }
          });
          if (!userExist) {
            setUser(querySnap.docs[0].data()); // Set the found user data to the 'user' state.
          }
        } else {
          setUser(null); // If no valid user is found, reset the 'user' state to null.
        }
      } else {
        setShowSearch(false); // Hide search results if the input is empty.
      }
    } catch (error) {
      // If an error occurs, you might want to handle it here (e.g., log the error, show a message to the user).
    }
  };

  const addChat = async (e) => {
    // Reference to the "messages" collection in Firestore
    const msgRef = collection(db, "messages");
    // Reference to the "chats" collection in Firestore
    const chatsRef = collection(db, "chats");

    try {
      // Create a new document reference in the "messages" collection
      const newMsgRef = doc(msgRef);

      // Set the initial data for the new message document
      await setDoc(newMsgRef, {
        createAt: serverTimestamp(), // Timestamp of message creation
        messages: [], // Empty array to hold the messages
      });

      // Update the current user's chat document with the new chat data
      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          messageId: newMsgRef.id, // ID of the new message document
          lastMsg: "", // Placeholder for the last message (initially empty)
          rId: userData.id, // Receiver ID (the ID of the other user)
          updatedAt: Date.now(), // Timestamp of the last update
          msgSeen: true, // Indicates if the message has been seen
        }),
      });

      // Update the other user's chat document with the new chat data
      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messageId: newMsgRef.id, // ID of the new message document
          lastMsg: "", // Placeholder for the last message (initially empty)
          rId: user.id, // Receiver ID (the current user's ID)
          updatedAt: Date.now(), // Timestamp of the last update
          msgSeen: true, // Indicates if the message has been seen
        }),
      });

      setUser(null);
      setShowSearch(false);
    } catch (error) {
      // Display an error message using toast and log the error to the console
      toast.error(error.message);
      console.error(error);
    }
  };

  const setChat = async (item) => {
    // hope this does not mess it up again
    try {
      setMessagesId(item.messageId);
      setChatUser(item);

      // message seen func am trying
      // Reference to the current user's chat document
      const userChatsRef = doc(db, "chats", userData.id);

      // Get the chat document snapshot
      const userChatsSnapShot = await getDoc(userChatsRef);

      // Extract chat data
      const userChatsData = userChatsSnapShot.data();

      // Find the chat index by messageId
      const chatIndex = userChatsData.chatsData.findIndex(
        (c) => c.messageId === item.messageId
      );

      // Mark the message as seen
      userChatsData.chatsData[chatIndex].msgSeen = true;

      // Update the chat document in Firestore
      await updateDoc(userChatsRef, {
        chatsData: userChatsData.chatsData,
      });
      console.log(chatIndex);
    } catch (error) {}
  };

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <div className="logo-detail">
            <img src={chatLogo} alt="logo" />
            <span>Chatty</span>
          </div>
          <div className="menu">
            <img src={menuIcon} alt="menu-icon" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              {/* <hr />
              <p>Sign out</p> */}
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            onChange={inputField}
            placeholder="Find a User..."
          />
        </div>
      </div>
      <div className="ls-list">
        {showSearch && user ? (
          <div onClick={addChat} className="friends add-user">
            <img src={user.avatar} alt="" />
            <p>{user.name}</p>
          </div>
        ) : (
          chatData.map((item, index) => (
            <div
              onClick={() => setChat(item)}
              key={index}
              className={`friends ${
                item.messageSeen || item.messageId !== messagesId
                  ? ""
                  : "border"
              }`}
            >
              <img src={item.userData.avatar} alt="" />
              <div>
                <p>{item.userData.name}</p>
                <span>{item.lastMsg}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
