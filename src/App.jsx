import { Link, Route, Router, Routes } from "react-router";
import "./App.css";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";
import { SudokuProvider } from "./state-management/GlobalState";
import SudokuRules from "./pages/SudokuRules";

function App() {
  //needs separation soon
  return (
    <SudokuProvider>
      <div className="h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
        <nav className="p-4 flex items-center">
          <Link
            to={{
            pathname: "/",
          }}
          className="text-xl font-bold m-2 hover-underline-animation left">
            Home
          </Link>
          <Link
            to={{
            pathname: "/game",
          }}
          className="text-xl font-bold m-2 hover-underline-animation left">
            Play Game
          </Link>
          <Link
            to={{
            pathname: "/rules",
          }}
          className="text-xl font-bold m-2 hover-underline-animation left">
            Rules
          </Link>
        </nav>
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
