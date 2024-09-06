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
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);

  const [input, setInput] = useState("");

  const msgSend = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id ?? "",
            text: input,
            createdAt: new Date(),
          }),
        });

        const userIds = [chatUser.rId, userData.id];

        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapShot = await getDoc(userChatsRef);

          if (userChatsSnapShot.exists()) {
            const userChatData = userChatsSnapShot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMsg = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].msgSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

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
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Send a message"
        />
        <input
          type="file"
          id="image"
          accept="image/png, image/jpg, image/jpeg"
          hidden
        />
        <label htmlFor="image">
          <img src={galleryIcon} alt="" />
        </label>
        <img onClick={msgSend} src={sendIcon} alt="" />
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
