import { useState } from "react";
import HomePage from "./screens/HomePage";
import "./App.css";
import { SignupPage } from "./screens/SignupPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <HomePage />
        <SignupPage />
      </div>
    </>
  );
}

export default App;
