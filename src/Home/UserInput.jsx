import React from "react";
import call from "../images/call-35.png";

const UserInput = () => {
  return (
    <div className="user-input">
      <div className="chat-info">
        <span>Peter</span>
        <div className="chat-icons">
          <img src={call} alt="" />
        </div>
      </div>
    </div>
  );
};

export default UserInput;
