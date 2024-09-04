import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import ChatBox from "../../components/ChatBox/chatBox";
import { AppContext } from "../../AppContext";

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData, userData]);

  return (
    <div className="chat">
      {loading ? (
        <div className="loading">
          <p className="loading"></p>
        </div>
      ) : (
        <div className="chat-container">
          <LeftSideBar />
          <ChatBox />
          <RightSideBar />
        </div>
      )}
      {/* <div className="cc">
        <p>Lorem</p>
      </div> */}
    </div>
  );
};

export default Chat;
