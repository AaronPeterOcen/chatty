import React from "react";
import Navigation from "../Home/Navigation";
import UserChat from "../Home/UserChat";

const HomePage = () => {
  return (
    <div>
      <div className="homepage">
        <div className="container">
          <Navigation />
          <UserChat />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
