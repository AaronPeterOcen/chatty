import React, { useContext, useEffect, useState } from "react";
import "./ProfileUpdate.css";
import avatarUser from "../../images/user.png";
import chatLogo from "../../images/chat-sm.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { AppContext } from "../../AppContext";
// import AppContextProvider from "../../AppContext";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(""); // using state for determining the image state for the user

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const { setUserData } = useContext(AppContext);

  const profileUpdate = async (e) => {
    e.preventDefault();

    try {
      // Checks if both previous and current images are absent.
      // If so, displays an error message asking the user to upload an image.
      if (!prevImage && !image) {
        toast.error("Please upload an image");
        return; // Exit the function early since no image is provided.
      }

      // Reference to the user's document in the Firestore database.
      const docRef = doc(db, "users", uid);

      if (image) {
        // If there is a new image to upload
        const imgUrl = await upload(image); // Uploads the new image and gets the URL.
        setPrevImage(imgUrl); // Updates the state with the newly uploaded image URL.

        // Updates the user's document with the new avatar URL, bio, and name.
        await updateDoc(docRef, { avatar: imgUrl, bio: bio, name: name });
      } else {
        // Updates the user's document with only bio and name if no new image is uploaded.
        await updateDoc(docRef, { bio: bio, name: name });
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate("/chat");
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

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
        <form onSubmit={profileUpdate}>
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
            type="text"
            placeholder="Enter your bio"
            value={bio} // Controlled component, where bio is the state holding the bio value
            onChange={(e) => setBio(e.target.value)} // Update state on change
          />
          <button type="submit">Save</button>
        </form>
        <img
          className="profile-pic"
          src={
            image
              ? URL.createObjectURL(image)
              : prevImage
              ? prevImage
              : chatLogo
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
