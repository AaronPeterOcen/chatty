import React, { useContext } from "react";
// import user from "../images/videoframe_366.png";
// import { SignUpPage } from "../components/SignUpPage";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Authentication } from "../context/Authentication";

const Navigation = () => {
  // updating user info
  const { currentUser } = useContext(Authentication);

  return (
    <div className="navigation">
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
      {/* <span className="logo">Chatty</span> */}
    </div>
  );
};

export default Navigation;
