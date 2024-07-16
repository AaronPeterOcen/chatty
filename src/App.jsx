import { useState } from "react";
import HomePage from "./screens/HomePage";
import "./App.css";
import { SignUpPage } from "./screens/SignUpPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <HomePage /> */}
        <SignUpPage />
      </div>
    </>
  );
}

export default App;
