// import { styled } from "@mui/material";
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
// useAuthState;

const style = {
  nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
  heading: `text-white text-3xl font-bold italic hover:not-italic text-base hover:text-3xl hover:scale-110 transition-transform duration-300`,
};

const Navbar = () => {
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <div className={style.nav}>
      <div className={style.heading}>
        <span>Chatty</span>
      </div>
      <SignIn />
    </div>
  );
};

export default Navbar;
