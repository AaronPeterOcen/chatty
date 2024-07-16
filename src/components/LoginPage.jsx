import React from "react";
import File from "../images/file-add.png";

export const LoginPage = () => {
  return (
    <div>
      <div className="form">
        <div className="form-container">
          <div className="form-wrapper">
            <span className="chatty-logo">Welcome to Chatty</span>
            <p className="text-reg">Login</p>
            {/* <title>Sign-Up</title> */}
            <form>
              <input type="text" placeholder="Enter Username" required />
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="password" />
              {/* <input type="checkbox" id="remember" /> */}
              {/* <p>Remember me</p> */}

              <br />
              <button>Login</button>
            </form>
            <p>
              {" "}
              Not a member? <a href="#">SignUp now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
