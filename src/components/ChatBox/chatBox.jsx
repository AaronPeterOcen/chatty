import React, { useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import userImage from "../../images/bird.jpg";
import helpIcon from "../../images/management.png";
import activeIcon from "../../images/check-mark.png";
import galleryIcon from "../../images/gallery.png";
import sendIcon from "../../images/send.png";
import sendImg from "../../images/videoframe_366.png";
import { AppContext } from "../../AppContext";
import chatLogo from "../../images/chat.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);

  const [input, setInput] = useState("");

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (resp) => {
        setMessages(resp.data().messages.reverse());
        console.log(resp.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  return chatUser ? (
    <div className="chat-box">
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>
          {chatUser.userData.name}{" "}
          <img className="dot" src={activeIcon} alt="" />
        </p>
        <img src={helpIcon} alt="" />
      </div>

      <div className="chat-msg">
        <div className="s-mg">
          <p className="msg">Lorem ipsum dolor sit amet.</p>
          <div>
            <img src={userImage} alt="" />
            <p>09:45</p>
          </div>
        </div>
        <div className="s-mg">
          {/* <p className="msg">Lorem ipsum dolor sit amet.</p> */}
          <img className="msg-img" src={sendImg} alt="" />
          <div>
            <img src={userImage} alt="" />
            <p>09:45</p>
          </div>
        </div>
        <div className="r-mg">
          <p className="msg">Lorem ipsum dolor sit amet.</p>
          <div>
            <img src={userImage} alt="" />
            <p>09:45</p>
          </div>
        </div>
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
  ) : (
    <div className="chat-welcome">
      <img src={chatLogo} alt="" />
      <p>Select a chat</p>
    </div>
  );
};

export default ChatBox;
