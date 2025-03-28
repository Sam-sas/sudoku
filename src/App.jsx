import { Link, Route, Router, Routes } from "react-router";
import "./App.css";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";
import { SudokuProvider } from "./state-management/GlobalState";

function App() {
  //needs separation soon
  return (
    <SudokuProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </SudokuProvider>
  );
}

export default App;
