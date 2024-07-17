import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../firebase";
import File from "../images/file-add.png";
import React, { useState } from "react";
import {
  // getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const SignUpPage = () => {
  // setting a state
  const [err, getErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[0].value;

    try {
      const res = createUserWithEmailAndPassword(auth, email, password);

      // const storage = getStorage();
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",

        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
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
              {err && <span>Error signing you up</span>}
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
