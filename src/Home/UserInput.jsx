import React from "react";
import call from "../images/call-35.png";
import Messages from "./Messages";
import InputArea from "./InputArea";

const UserInput = () => {
  return (
    <div className="user-input">
      <div className="chat-info">
        <span>Peter</span>
        <div className="chat-icons">
          <img src={call} alt="" />
        </div>
      </div>
      <Messages />
      <InputArea />
    </div>
  );
};

export default UserInput;
