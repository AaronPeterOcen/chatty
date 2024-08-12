import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";

function App() {
  return (
    <div>
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
