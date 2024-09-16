import React, { useContext, useEffect, useState } from "react";
import "./RightSideBar.css";
// import userImage from "../../images/bird.jpg";

// import activeIcon from "../../images/check-mark.png";
// import pic1 from "../../images/mustang-gt3.jpg";
// import pic2 from "../../images/porsche.jpg";
// import pic3 from "../../images/redbull-racing-1.jpg";

// import pic4 from "../../images/renault-clio.jpg";
import { signout } from "../../config/firebase";
// import { signOut } from "firebase/auth";
import { AppContext } from "../../AppContext";
// import pic5 from "../../images/";

const RightSideBar = () => {
  const { chatUser, messages } = useContext(AppContext);
  const [msgImg, setMsgImg] = useState([]);

  useEffect(() => {
    let tempVar = [];
    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image);
      }
    });
    // console.log(tempVar);
    setMsgImg(tempVar);
  }, [messages]);

  return chatUser ? (
    <div className="rs">
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="" />
        <h3>
          {chatUser.userData.name}{" "}
          {/* <img className="dot" src={activeIcon} alt="" /> */}
        </h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          {msgImg.map((url, index) => (
            <img
              key={index}
              src={url}
              alt=""
              onClick={() => window.open(url, "_blank")} // Open image in a new window
              style={{ cursor: "pointer" }} // Add a pointer cursor to indicate it's clickable
            />
          ))}
          {/* <img src={pic1} alt="" />
          <img src={pic2} alt="" />
          <img src={pic3} alt="" />
          <img src={pic4} alt="" />
          <img src={pic2} alt="" />
          <img src={pic1} alt="" /> */}
        </div>
      </div>
      <button
        onClick={() => {
          signout();
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="rs-empty">
      <button
        onClick={() => {
          signout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default RightSideBar;
