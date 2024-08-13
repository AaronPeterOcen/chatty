import React from "react";
import "./LeftSideBar.css";
import chatLogo from "../../images/chat-sm.png";
import menuIcon from "../../images/ellipsis.png";
import searchIcon from "../../images/search.png";
import userImage from "../../images/prsh.jpg";

const LeftSideBar = () => {
  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={chatLogo} alt="logo" />
          <div className="menu">
            <img src={menuIcon} alt="menu-icon" />
          </div>
        </div>
        <div className="ls-search">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Find a User..." />
        </div>
        <div className="ls-list">
          <div className="friends">
            <img src={userImage} alt="" />
            <div>
              <p>Username</p>
              <span>Hello there!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
