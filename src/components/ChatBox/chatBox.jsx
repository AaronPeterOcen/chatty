import React from "react";
import "./ChatBox.css";
import userImage from "../../images/prsh.jpg";
import helpIcon from "../../images/management.png";
import activeIcon from "../../images/check-mark.png";
import galleryIcon from "../../images/gallery.png";
import sendIcon from "../../images/send.png";

const ChatBox = () => {
  return (
    <div className="chat-box">
      <div className="chat-user">
        <img src={userImage} alt="" />
        <p>
          Username <img className="dot" src={activeIcon} alt="" />
        </p>
        <img src={helpIcon} alt="" />
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Send a message" />
        <input
          type="file"
          id="image"
          accept="image/png, image/jpg, image/jpeg"
          hidden
        />
        <label htmlFor="image">
          <img src={galleryIcon} alt="" />
        </label>
        <img src={sendIcon} alt="" />
      </div>
    </div>
  );
};

export default ChatBox;
