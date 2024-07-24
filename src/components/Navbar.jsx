// import { styled } from "@mui/material";
import React from "react";

const style = {
  nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
  heading: `text-white text-3xl`,
};

const Navbar = () => {
  return (
    <div className={style.nav}>
      <div className={style.heading}>
        <span>Chatty</span>
      </div>
    </div>
  );
};

export default Navbar;
