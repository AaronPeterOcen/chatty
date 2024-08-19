import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {
  // Import the necessary functions from React and your routing/authentication libraries
  const navigate = useNavigate(); // Hook from react-router-dom to programmatically navigate between routes

  // useEffect hook to run side effects in functional components
  useEffect(() => {
    // Listen for changes in authentication state
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If a user is authenticated, navigate to the "/chat" route
        navigate("/chat");
      } else {
        // If no user is authenticated, navigate to the home ("/") route
        navigate("/");
      }
    });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* using routes to link to the three pages that i will be using */}
        <Route path="/" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
