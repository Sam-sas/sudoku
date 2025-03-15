import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { getRandomGame } from "./calls/getGames";
import Box from "./components/Box";

function App() {
  const [loading, setLoading] = useState(true);
  const [sudokuGame, setSudokuGame] = useState({});
  const [difficulty, setDifficulty] = useState("");
  const [prefilled, setPrefilled] = useState();
  const [goingWell, setGoingWell] = useState(true);
  const [highlights, setHighlights] = useState({
    boxKey: null,
    row: null,
    column: null,
    boxRowStart: null,
    boxColStart: null,
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    setLoading(true);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchSudoku();
    }
  }, []);

  const fetchSudoku = async () => {
    const data = await getRandomGame();
    if (data) {
      setSudokuGame({
        puzzle: data.puzzle,
        solution: data.solution,
      });
      setDifficulty(data.difficulty);
      setPrefilled(data.prefilled);
      setLoading(false);
    }
  };

  const handleInputChange = (boxKey, index, value) => {
    const updatedPuzzle = sudokuGame.puzzle;
    updatedPuzzle[boxKey][index] = value === "" ? 0 : Number(value);
    setSudokuGame((prevState) => ({
      ...prevState,
      puzzle: updatedPuzzle,
    }));
  };

  const checkSolution = () => {
    Object.keys(sudokuGame.puzzle).forEach((boxKey) => {
      sudokuGame.puzzle[boxKey].forEach((number, index) => {
        if (number !== 0) {
          if (number !== sudokuGame.solution[boxKey][index]) {
            setGoingWell(false);
          } else {
            setGoingWell(true);
          }
        }
      });
    });
  }

/* 
  What this does right now is its a function that gets data passed from the child component
  and sent into the parent component to do the logic.
  boxKey, row, and column are all from the child component. Not the parent.
*/  
  const addHighlights = (boxKey, row, column) => {
    //boxKey === box1
    //boxIndex === 1
    const boxIndex = parseInt(boxKey.substr(3)); 
    
    // Calculate the row and column ranges for the box
    const boxRowStart = Math.floor(boxIndex / 3) * 3;
    const boxColStart = (boxIndex % 3) * 3;
    // Update the highlights state with the current box, row, and column
    setHighlights({
      boxKey,
      row,
      column,
      boxRowStart,
      boxColStart,
    });
  };

  const highlightClasses = "highlight w-16 h-16 text-center text-4xl border-2";
  const defaultClasses = "default w-16 h-16 text-center text-4xl border-2";

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <h2>Difficulty: {difficulty}</h2>
      <div className="flex justify-center">
        <div className="sudokuGrid grid grid-cols-3 grid-rows-3">
          {Object.keys(sudokuGame.puzzle).map((boxKey, index) => {
            return (
              <Box
              key={boxKey}
              boxKey={boxKey}
              boxNumbers={sudokuGame.puzzle[boxKey]}
              prefilled={prefilled}
              // highlights={highlights}
              // highlightClasses={highlightClasses}
              // defaultClasses={defaultClasses}
              // onInputChange={handleInputChange}
              // onFocus={addHighlights}
              />
            );
          })}
        </div>
      </div>
      <div className="buttons">
        <button className="rounded-full bg-cyan-300 p-4 m-4" onClick={checkSolution}>Check Progress</button>
        <button className="rounded-full bg-pink-500 p-4 m-4 text-white" onClick={fetchSudoku}>New Game</button>
        {goingWell ? <p>Going well so far!</p> : <p>Looks like you have some wrong numbers</p>}
      </div>
    </div>
  );
}

export default App;
