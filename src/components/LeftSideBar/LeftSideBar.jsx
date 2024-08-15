import React from "react";
import "./LeftSideBar.css";
import chatLogo from "../../images/chat-sm.png";
import menuIcon from "../../images/ellipsis.png";
import searchIcon from "../../images/search.png";
import userImage from "../../images/bird.jpg";

const LeftSideBar = () => {
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
              <p>Edit Profile</p>
              <hr />
              <p>Sign out</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Find a User..." />
        </div>
      </div>
      <div className="ls-list">
        {Array(10)
          .fill("")
          .map((item, index) => (
            <div key={index} className="friends">
              <img src={userImage} alt="" />
              <div>
                <p>Username</p>
                <span>Hello there!</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
