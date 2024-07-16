import React from "react";
import Navigation from "../Home/Navigation";
// import UserChat from "../Home/UserChat";
// import Chat from "../Home/Chats";
import Chats from "../Home/Chats";
import UserInput from "../Home/UserInput";

const HomePage = () => {
  return (
    <div>
      <div className="homepage">
        <div className="home-container">
          <Chats />
          <UserInput />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
