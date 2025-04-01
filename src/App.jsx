import { Link, Route, Router, Routes } from "react-router";
import "./App.css";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";
import { SudokuProvider } from "./state-management/GlobalState";
import ThemeSwitch from "./atoms/ThemeSwitch";

function App() {
  //needs separation soon
  return (
    <SudokuProvider>
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Sudoku Game</h1>
          <ThemeSwitch />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </main>
      </div>
    </SudokuProvider>
  );
}

export default App;
