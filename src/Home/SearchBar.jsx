import React from "react";
import UserChat from "./UserChat";

const SearchBar = () => {
  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="Search for User" />
        <UserChat />
        {/* <UserChat /> */}
      </div>
    </div>
  );
};

export default SearchBar;
