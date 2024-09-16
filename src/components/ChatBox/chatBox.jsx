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
import upload from "../../lib/upload";
// import Modal from "./Modal";

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext); // Get context values

  const [input, setInput] = useState(""); // State to manage user input

  const msgSend = async () => {
    try {
      if (input && messagesId) {
        // Update the messages array in Firestore by adding a new message
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id ?? "", // Sender's ID
            text: input,
            createdAt: new Date(), // Timestamp
          }),
        });

        // Update the chat preview for both users involved in the chat
        const userIds = [chatUser.rId, userData.id];
        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id); // Reference to user's chat
          const userChatsSnapShot = await getDoc(userChatsRef);

          if (userChatsSnapShot.exists()) {
            // If the chat exists, update the last message and timestamp
            const userChatData = userChatsSnapShot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMsg = input.slice(0, 30); // Show part of the message in preview
            userChatData.chatsData[chatIndex].updatedAt = Date.now(); // Update timestamp

            // If the other user received the message, mark it as unseen
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].msgSeen = false;
            }

            // Save updated chat data
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message); // Show error message on failure
      console.error(error); // Log the error for debugging
    }
    setInput(""); // Clear the input field
  };

  const imgSend = async (e) => {
    try {
      const fileUrl = await upload(e.target.files[0]); // Upload the image file and get its URL

      if (fileUrl && messagesId) {
        // Update the messages array in Firestore by adding the image
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id ?? "", // Sender's ID
            image: fileUrl,
            createdAt: new Date(), // Timestamp
          }),
        });

        // Update the chat preview for both users involved in the chat
        const userIds = [chatUser.rId, userData.id];
        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id); // Reference to user's chat
          const userChatsSnapShot = await getDoc(userChatsRef);

          if (userChatsSnapShot.exists()) {
            const userChatData = userChatsSnapShot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMsg = "Image"; // Set "Image" as the last message
            userChatData.chatsData[chatIndex].updatedAt = Date.now(); // Update timestamp

            // If the other user received the image, mark it as unseen
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].msgSeen = false;
            }

            // Save updated chat data
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message); // Show error message on failure
      console.error(error); // Log the error for debugging
    }
  };

  const timeConvert = (timeStamp) => {
    let date = timeStamp.toDate(); // Convert timestamp to Date object
    const hr = date.getHours(); // Get hours
    const min = date.getMinutes(); // Get minutes
    const formattedMinutes = min < 10 ? `0${min}` : min; // Format minutes to always show two digits

    return `${hr}:${formattedMinutes}`; // Return time in HH:mm format
  };

  useEffect(() => {
    if (messagesId) {
      // Subscribe to changes in the messages document and update the chat in real-time
      const unSub = onSnapshot(doc(db, "messages", messagesId), (resp) => {
        setMessages(resp.data().messages.reverse()); // Reverse the messages array to show the latest message at the bottom
      });
      return () => {
        unSub(); // Clean up the listener on component unmount
      };
    }
  }, [messagesId]); // Effect runs when `messagesId` changes

  return chatUser ? (
    <div className="chat-box">
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>
          {chatUser.userData.name}{" "}
          {/* <img className="dot" src={activeIcon} alt="" /> */}
        </p>
        {/* <img src={helpIcon} alt="" /> */}
      </div>

      <div className="chat-msg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sId === userData.id ? "s-mg" : "r-mg"}
          >
            {msg["image"] ? (
              <img
                src={msg.image}
                className="message-img"
                // onClick={() => openModal(msg.image)}
                onClick={() =>
                  window.open(msg.image, "_blank", "noopener,noreferrer")
                } // Opens image in a new window
                alt="Message Image"
              />
            ) : (
              <p className="msg">{msg.text}</p>
            )}
            <div>
              <img
                src={
                  msg.sId === userData.id
                    ? userData.avatar
                    : chatUser.userData.avatar
                }
              />
              <p>{timeConvert(msg.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Send a message"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              msgSend(); // Trigger message sending on pressing Enter
            }
          }}
        />
        <input
          onChange={imgSend}
          type="file"
          id="image"
          accept="image/png, image/jpg, image/jpeg"
          hidden
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              msgSend(); // Trigger message sending on pressing Enter
            }
          }}
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
