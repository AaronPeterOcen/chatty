import React from "react";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import UserChat from "./UserChats";

const Chats = () => {
  return (
    <div className="chats">
      <Navigation />
      <SearchBar />
      <UserChat />
    </div>
  );
};

export default Chats;
