import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import File from "../images/file-add.png";
import React, { useState } from "react";
import {
  // getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  // setting a state
  const [err, getErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(res);

      // const storage = getStorage();
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        // "state_changed",
        (error) => {
          // Handle unsuccessful uploads
          getErr(true);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // user chats in firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      getErr(true);
    }
    // const auth = getAuth();
  };
  return (
    <div>
      <div className="form">
        <div className="form-container">
          <div className="form-wrapper">
            <span className="chatty-logo">Welcome to Chatty</span>
            <p className="text-reg">Register</p>
            {/* <form }></form> */}
            {/* <title>Sign-Up</title> */}
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter Username" required />
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="password" />
              {/* <input type="checkbox" id="remember" /> */}
              {/* <p>Remember me</p> */}
              <input style={{ display: "none" }} type="file" id="file" />
              <label htmlFor="file">
                <img src={File} alt="Add file icon" />
                <span>Add file </span>
              </label>
              <br />
              <button>Sign Up</button>
              {err && <span>Email or Username already in use!</span>}
            </form>
            <p>
              {" "}
              Already a member? <a href="#">Login now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
