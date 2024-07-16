import React from "react";

export const SignupPage = () => {
  return (
    <div>
      <div className="form">
        <div className="form-container">
          <div className="form-wrapper">
            <form>
              <input type="text" placeholder="username" />
              <input type="email" placeholder="user email" />
              <input type="password" placeholder="password" />
              <input type="file" />
              <br />
              <button>Sign Up</button>
            </form>
            <p>Not registered yet for an Account? Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};
