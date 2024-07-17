import React from "react";

const Message = () => {
  return (
    <div className="message owner">
      <div className="message-info">
        <img
          src="https://i.pinimg.com/236x/4a/34/28/4a34287148764cb9efe09974ffb3aa1d.jpg"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="message-content">
        <p>Hello</p>
        <img
          src="https://i.pinimg.com/236x/4a/34/28/4a34287148764cb9efe09974ffb3aa1d.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;
