// import { useState } from "react";
import HomePage from "./components/HomePage";
import "./App.css";
import { SignUpPage } from "./components/SignUpPage";
import { LoginPage } from "./components/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Authentication } from "./context/Authentication";

function App() {
  const { currentUser } = useContext(Authentication);
  // const [count, setCount] = useState(0);

  console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        {/* <SignUpPage /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
