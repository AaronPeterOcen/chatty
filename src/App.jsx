import { useState } from "react";
import HomePage from "./components/HomePage";
import "./App.css";
import { SignUpPage } from "./components/SignUpPage";
import { LoginPage } from "./components/LoginPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <HomePage />
        {/* <LoginPage /> */}
        {/* <SignUpPage /> */}
      </div>
    </>
  );
}

export default App;
