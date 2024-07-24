import "./index.css";
import React from "react";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { useContext } from "react";
import Navbar from "./components/Navbar";
import { auth } from "./firebase/firebase";

const style = {
  appContainer: `max-w-[720px] mx-auto text-center `,
  sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative`,
};

function App() {
  return (
    <div className="bg-[url('/images/chat-bg.png')]">
      <div className={style.appContainer}>
        <section className={style.sectionContainer}>
          <Navbar />
        </section>
        {/* <SignUpPage /> */}
      </div>
    </div>
  );
}

export default App;
