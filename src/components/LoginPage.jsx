import React, { useState } from "react";
// import File from "../images/file-add.png";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// useNavigate

export const LoginPage = () => {
  // setting a state
  const [err, getErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);

    // const displayName = e.target[0].value;
    const email = e.target[0].value;
    const password = e.target[1].value;
    // const file = e.target[3].files[0];

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
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
            <p className="text-reg">Login</p>
            {/* <title>Sign-Up</title> */}
            <form onSubmit={handleSubmit}>
              {/* <input type="text" placeholder="Enter Username" required /> */}
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="password" />
              {/* <input type="checkbox" id="remember" /> */}
              {/* <p>Remember me</p> */}

              <br />
              <button>Login</button>
              {err && <span>Wrong password or email!</span>}
            </form>
            <p>
              {" "}
              Not a member? <Link to="/signup">SignUp now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
