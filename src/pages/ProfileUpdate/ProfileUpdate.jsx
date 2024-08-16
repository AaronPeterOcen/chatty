import React, { useState } from "react";
import "./ProfileUpdate.css";
import avatarUser from "../../images/user.png";
import chatLogo from "../../images/chat-sm.png";

const ProfileUpdate = () => {
  // const [image , setImage] = useState(false);

  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              type="file"
              name=""
              id="avatar"
              accept=".png , .jpeg, .jpg"
              hidden
            />
            <img className="" src={avatarUser} alt="" />
            Upload Image
          </label>
          <input type="text" placeholder="User name" required />
          <textarea placeholder="Bio" id="" required></textarea>
          <button type="submit">Save</button>
        </form>
        <img className="profile-pic" src={chatLogo} alt="" />
      </div>
    </div>
  );
};

export default ProfileUpdate;
