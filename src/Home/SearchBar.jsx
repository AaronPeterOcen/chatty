import React, { useContext, useState } from "react";
import {
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
import { db } from "../firebase";
import { Authentication } from "../context/Authentication";

// import UserChat from "./UserChats";

const SearchBar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(Authentication);

  const searchHandler = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const keyHandler = (e) => {
    e.code === "Enter" && searchHandler();
  };

  const handleSelect = async () => {
    // check for group, if empty create new one
    // const selectedValue = event.target.value;
    // if (!selectedValue || !selectedValue.uid) {
    //   console.error("Selected value or UID is undefined");
    //   return;
    // }
    const addedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const resp = await getDoc(doc(db, "chats", addedId));

      if (!resp.exists()) {
        // create chat
        await setDoc(doc(db, "chats", addedId), { messages: [] });

        // user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [addedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [addedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [addedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [addedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    // setUsername("");
    // userchats
  };

  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          placeholder="Search for User"
          onKeyDown={keyHandler}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User null!</span>}
      {user && (
        <div className="user-chats" onClick={handleSelect}>
          <img src={user.photoURL} alt="user" />
          {/* <p>{user.uid}</p> */}
          <div className="user-chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
