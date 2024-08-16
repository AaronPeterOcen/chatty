import React, { useState } from "react";
import "./ProfileUpdate.css";
import avatarUser from "../../images/user.png";
import chatLogo from "../../images/chat-sm.png";

const ProfileUpdate = () => {
  const [image, setImage] = useState(false); // using state for determining the image state for the user

  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => setImage(e.target.files[0])} // will allow the user to upload an img from files
              type="file"
              name=""
              id="avatar"
              accept=".png , .jpeg, .jpg"
              hidden
            />
            {/* Render the uploaded image if available, otherwise use the default
            avatar */}
            <img src={image ? URL.createObjectURL(image) : avatarUser} alt="" />
            Upload Image
          </label>
          <input type="text" placeholder="User name" required />
          <textarea placeholder="Bio" id="" required></textarea>
          <button type="submit">Save</button>
        </form>
        <img
          className="profile-pic"
          src={image ? URL.createObjectURL(image) : chatLogo}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
