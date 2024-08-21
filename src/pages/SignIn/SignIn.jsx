import React, { useState } from "react";
import "./SignIn.css";
import chatLogo from "../../images/chat-sm.png";
import { login, signup } from "../../config/firebase";

const SignIn = () => {
  // will be used to change the form state
  const [currState, setCurrState] = useState("Sign Up");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Event handler for form submission
  const onSubmitHandler = (e) => {
    // Prevent the default form submission behavior to avoid page reload
    e.preventDefault();

    // Check if the current state is "Sign Up"
    if (currState === "Sign Up") {
      // If yes, call the signup function with the provided username, email, and password
      signup(username, email, password);
    } else {
      // Otherwise, call the login function with the provided email and password
      login(email, password);
    }
  };

  return (
    <div className="signIn">
      <img src={chatLogo} className="logo" />
      {/* adding the form field for user input */}
      <form onSubmit={onSubmitHandler} className="signIn-form">
        <h2>{currState}</h2>
        {/* using currState to determine what will be displayed on the screen */}
        {currState === "Sign Up" ? (
          <input
            onChange={(e) => setUserName(e.target.value)} // email state is updated in real-time as the user types, making it easy to manage form data.
            value={username}
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        ) : null}
        <input
          onChange={(e) => setEmail(e.target.value)} // email state is updated in real-time as the user types, making it easy to manage form data.
          value={email}
          type="email"
          placeholder="email"
          className="form-input"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)} // password state is updated in real-time as the user types, making it easy to manage form data.
          value={password}
          type="password"
          placeholder="password"
          className="form-input"
          required
        />
        <button>
          {/* will change button state based on the user selected fields */}
          {currState === "Sign Up" ? "Create account" : "Sign In "}
        </button>
        {currState === "Sign Up" ? (
          <div className="signIn-term">
            <input type="checkbox" />
            <p>Agree to all terms and conditions.</p>
          </div>
        ) : null}
        <div className="signIn-forgot">
          {currState === "Sign In" ? (
            <p className="signIn-toggle">
              Do not have an account with us?{" "}
              {/* using setCurrState to change to the sign up form  */}
              <span onClick={() => setCurrState("Sign Up")}> Sign Up here</span>
            </p>
          ) : (
            <p className="signIn-toggle">
              Already have an account with us?{" "}
              {/* using setCurrState to switch to the sign in form  */}
              <span onClick={() => setCurrState("Sign In")}> Sign In here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
