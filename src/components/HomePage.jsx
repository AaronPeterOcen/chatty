import React from "react";
import Navigation from "../Home/Navigation";
import UserChat from "../Home/UserChat";
// import Chat from "../Home/Chats";
import Chats from "../Home/Chats";

const HomePage = () => {
  return (
    <div>
      <div className="homepage">
        <div className="home-container">
          <Chats />
          <UserChat />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
