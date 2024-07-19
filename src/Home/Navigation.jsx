import React from "react";
import user from "../images/videoframe_366.png";

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="user">
        <img
          src="https://i.pinimg.com/236x/5b/e8/bf/5be8bf498d97fd90dff4dd0ab78fb487.jpg"
          alt=""
        />
        <span>Pteer</span>
        <button onClick={()}>logout</button>
      </div>
      {/* <span className="logo">Chatty</span> */}
    </div>
  );
};

export default Navigation;
