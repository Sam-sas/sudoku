import { Link, Route, Router, Routes } from "react-router";
import "./App.css";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";

function App() {

  //needs separation soon
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
