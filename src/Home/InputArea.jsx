import React from "react";
import Image from "../images/img-32.png";
import AddImg from "../images/attach-32.png";
// import Send from "../images/send-32.png";

const InputArea = () => {
  return (
    <div className="input-area">
      <input type="text" placeholder="Start messaging..." />
      <div className="send">
        <img src={AddImg} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={Image} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default InputArea;
