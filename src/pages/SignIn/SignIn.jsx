import React, { useState } from "react";
import "./SignIn.css";
import chatLogo from "../../images/chat-sm.png";

const SignIn = () => {
  // will be used to change the form state
  const [currState, setCurrState] = useState("Sign Up");

  return (
    <div className="signIn">
      <img src={chatLogo} className="logo" />
      {/* adding the form field for user input */}
      <form className="signIn-form">
        <h2>{currState}</h2>
        {/* using currState to determine what will be displayed on the screen */}
        {currState === "Sign Up" ? (
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        ) : null}
        <input
          type="email"
          placeholder="email"
          className="form-input"
          required
        />
        <input
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
