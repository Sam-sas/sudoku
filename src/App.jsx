import { Link, Route, Router, Routes } from "react-router";
import "./App.css";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";
import { SudokuProvider } from "./state-management/GlobalState";
import SudokuRules from "./pages/SudokuRules";
import Navigation from "./organisms/Navigation";

function App() {
  return (
    <SudokuProvider>
      <div className="h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/game" element={<Game />} />
            <Route path="/rules" element={<SudokuRules />} />
          </Routes>
        </main>
      </div>
    </SudokuProvider>
  );
}

export default App;
