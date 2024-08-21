import React, { useEffect, useState } from "react";
import "./ProfileUpdate.css";
import avatarUser from "../../images/user.png";
import chatLogo from "../../images/chat-sm.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false); // using state for determining the image state for the user

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");

  useEffect(() => {
    // Listen for changes in the authentication state
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If a user is authenticated, set the user's ID (uid) in state
        setUid(user.uid);

        // Reference to the user's document in the "users" collection
        const docRef = doc(db, "users", user.uid);

        // Fetch the user's document from the database
        const docSnap = await getDoc(docRef);

        // Check and set the user's name if it exists in the document
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }

        // Check and set the user's bio if it exists in the document
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }

        // Check and set the user's avatar if it exists in the document
        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar);
        }
      } else {
        // If no user is authenticated, navigate to the home page
        navigate("/");
      }
    });
  });

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
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="User name"
            required
          />
          <textarea
            onChange={(e) => setBio(e.target.bio)}
            value={bio}
            placeholder="Bio"
            id=""
            required
          ></textarea>
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
