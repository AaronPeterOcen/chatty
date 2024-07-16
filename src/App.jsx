import { useState } from "react";
import HomePage from "./screens/HomePage";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <HomePage />
        <h1>Chatty</h1>
      </div>
    </>
  );
}

export default App;
