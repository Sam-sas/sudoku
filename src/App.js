import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { getGameDifficulty, getRandomGame } from "./calls/getGames";
import Box from "./components/Box";
import NumPad from "./components/NumPad";

function App() {
  const [loading, setLoading] = useState(true);
  const [sudokuGame, setSudokuGame] = useState({});
  const [difficulty, setDifficulty] = useState("");
  const [prefilled, setPrefilled] = useState();
  const [goingWell, setGoingWell] = useState(true);
  const [highlights, setHighlights] = useState({
    outerBoxLocation: null,
    innerBoxLocation: null,
  });
  const [togglingNotesOn, setTogglingNotesOn] = useState(false);
  const isFirstRender = useRef(true);
  const difficulties = ["easy", "medium", "hard", "expert"];

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
        puzzle: turn2DArray(data.puzzle),
        solution: turn2DArray(data.solution),
      });
      setDifficulty(data.difficulty);
      setPrefilled(turn2DArray(data.prefilled));
      setLoading(false);
    }
  };

  const selectDifficulty = async (level) => {
    const data = await getGameDifficulty(level);
    if (data) {
      setSudokuGame({
        puzzle: turn2DArray(data.puzzle),
        solution: turn2DArray(data.solution),
      });
      setDifficulty(data.difficulty);
      setPrefilled(turn2DArray(data.prefilled));
      setLoading(false);
    }
  };

  const turn2DArray = (boxes) => {
    const size = 3;
    const values = Object.values(boxes); // Get the values from the object

    // Ensure each box has exactly 9 numbers, then create the 2D array
    const threeByThreeBox = Array.from({ length: size }, (_, row) =>
      values.slice(row * size, row * size + size)
    );

    return threeByThreeBox;
  };

  const handleInputChange = (outerBoxIndex, inputIndex, value) => {
    const updatedPuzzle = [...sudokuGame.puzzle];

    updatedPuzzle[outerBoxIndex.boxRowIndex][outerBoxIndex.boxColumnIndex][
      inputIndex
    ] = value === "" ? 0 : Number(value);
    setSudokuGame((prevState) => ({
      ...prevState,
      puzzle: updatedPuzzle,
    }));
  };

  const checkSolution = () => {
    let isGoingWell = true;

    sudokuGame.puzzle.forEach((box, boxIndex) => {
      box.forEach((row, rowIndex) => {
        row.forEach((num, columnIndex) => {
          if (num !== 0 && num !== sudokuGame.solution[boxIndex][rowIndex][columnIndex]) {
            isGoingWell = false;
          }
        });
      });
      setGoingWell(isGoingWell);
    });
  };

  const addHighlights = (boxIndex, innerBoxIndex) => {
    setHighlights({
      outerBoxLocation: {row: boxIndex.boxRowIndex, column: boxIndex.boxColumnIndex},
      innerBoxLocation: {row: innerBoxIndex.boxRowIndex, column: innerBoxIndex.boxColumnIndex},
    });
  };

  const notesToggle = () => {
    setTogglingNotesOn(!togglingNotesOn);
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  //needs separation soon
  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <h2>Difficulty: {difficulty}</h2>
      <div className="flex justify-center">
        <div className="sudokuGrid">
          {sudokuGame.puzzle.map((row, boxRowIndex) => {
            return (
              <div key={boxRowIndex} className="flex">
                {row.map((num, boxColumnIndex) => {
                  let boxIndex = { boxRowIndex, boxColumnIndex };
                  return (
                    //Need to create a global state since im passing through different components
                    <Box
                      boxNumbers={num}
                      boxIndex={boxIndex}
                      prefilled={prefilled}
                      highlights={highlights}
                      onInputChange={handleInputChange}
                      onFocus={addHighlights}
                      onStatus={togglingNotesOn}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <NumPad />
      <div className="buttons">
        <button
          className="rounded-full bg-cyan-300 p-4 m-4"
          onClick={checkSolution}
        >
          Check Progress
        </button>
        <button
          className="rounded-full bg-pink-500 p-4 m-4 text-white"
          onClick={fetchSudoku}
        >
          New Game
        </button>
        <button className="rounded-full bg-orange-500 p-4 m-4 text-white" onClick={notesToggle}>Pencil</button>
        {goingWell ? (
          <p>Going well so far!</p>
        ) : (
          <p>Looks like you have some wrong numbers</p>
        )}
      </div>
      {difficulties.map((level) => (
        <button className="rounded-full bg-green-500 p-4 m-4 text-white" key={level} onClick={() => selectDifficulty(level)}>
          {level}
        </button>
      ))}

    </div>
  );
}

export default App;
