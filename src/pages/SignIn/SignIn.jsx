import React from "react";
import "./SignIn.css";
import chatLogo from "../../images/chat-sm.png";

const SignIn = () => {
  return (
    <div className="signIn">
      <img src={chatLogo} className="logo" />
      {/* adding the form field for user input */}
      <form className="signIn-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="form-input"
          required
        />
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
        <button>SignUp</button>
        <div className="signIn-term">
          <input type="checkbox" />
          <p>Agree to all terms and conditions.</p>
        </div>
        <div className="signIn-forgot">
          <p className="sigIn-toggle">
            Already have an account with us? <span>Sign In here</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
