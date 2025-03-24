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
  const [selectedCell, setSelectedCell] = useState({
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
          if (
            num !== 0 &&
            num !== sudokuGame.solution[boxIndex][rowIndex][columnIndex]
          ) {
            isGoingWell = false;
          }
        });
      });
      setGoingWell(isGoingWell);
    });
  };

  //ALL TO BECOME ROW AND COLUMN IN NAME ONLY
  const addHighlights = (boxIndex, innerBoxIndex, inputIndex) => {
    setHighlights({
      outerBoxLocation: {
        row: boxIndex.boxRowIndex,
        column: boxIndex.boxColumnIndex,
      },
      innerBoxLocation: {
        row: innerBoxIndex.boxRowIndex,
        column: innerBoxIndex.boxColumnIndex,
      },
    });
    setSelectedCell({
      outerBoxLocation: {
        row: boxIndex.boxRowIndex,
        column: boxIndex.boxColumnIndex,
      },
      innerBoxLocation: {
        row: innerBoxIndex.boxRowIndex,
        column: innerBoxIndex.boxColumnIndex,
      },
      inputIndex: inputIndex,
    });
  };

  const notesToggle = () => {
    setTogglingNotesOn(!togglingNotesOn);
  };

  const updateSelectedCell = (chosenNumber) => {
    console.log(chosenNumber);
    if (selectedCell) {
      console.log(selectedCell);
      const updatedPuzzle = [...sudokuGame.puzzle];

      updatedPuzzle[selectedCell.outerBoxLocation.row][
        selectedCell.outerBoxLocation.column
      ][selectedCell.inputIndex] =
        chosenNumber === "" ? 0 : Number(chosenNumber);
      setSudokuGame((prevState) => ({
        ...prevState,
        puzzle: updatedPuzzle,
      }));
    }
  };

  const reset = () => {
    if (selectedCell) {
      console.log(selectedCell);
      const updatedPuzzle = [...sudokuGame.puzzle];

      updatedPuzzle[selectedCell.outerBoxLocation.row][
        selectedCell.outerBoxLocation.column
      ][selectedCell.inputIndex] = 0;
      setSudokuGame((prevState) => ({
        ...prevState,
        puzzle: updatedPuzzle,
      }));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  //needs separation soon
  return (
    <div className="App flex flex-col justify-center items-center">
      <h1>Sudoku Game</h1>
      <h2>Difficulty: {difficulty}</h2>
      <div className="gameArea flex">
        <div></div>
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
        <NumPad onNumberClick={updateSelectedCell} />
      </div>
      <div className="buttons flex flex-row">
        <button className="rounded-full bg-cyan-300 p-4 m-4" onClick={reset}>
          Erase
        </button>
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
          Random Game
        </button>
        <button
          className="rounded-full bg-orange-500 p-4 m-4 text-white"
          onClick={notesToggle}
        >
          Pencil
        </button>
        {goingWell ? (
          <p>Going well so far!</p>
        ) : (
          <p>Looks like you have some wrong numbers</p>
        )}
      </div>
      <div className="buttons flex flex-row">
        {difficulties.map((level) => (
          <button
            className="rounded-full bg-green-500 p-4 m-4 text-white"
            key={level}
            onClick={() => selectDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
