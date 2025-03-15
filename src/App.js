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
    highlightedRowIndex: null,
    highlightedColumnIndex: null,
  });
  const isFirstRender = useRef(true);
  const highlightClasses = "highlight w-16 h-16 text-center text-4xl border-2";
  const defaultClasses = "default w-16 h-16 text-center text-4xl border-2";

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

  const turn2DArray = (boxes) => {
    const size = 3;
    const values = Object.values(boxes); // Get the values from the object

    // Ensure each box has exactly 9 numbers, then create the 2D array
    const threeByThreeBox = Array.from({ length: size }, (_, row) =>
      values.slice(row * size, row * size + size)
    );
    // console.log(threeByThreeBox);

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

  //fix me on button
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
  };

  /* 
  What this does right now is its a function that gets data passed from the child component
  and sent into the parent component to do the logic.
  boxKey, row, and column are all from the child component. Not the parent.
*/
  const addHighlights = (boxIndex, innerBoxIndex, inputIndex) => {
    console.log("focus me");
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <h2>Difficulty: {difficulty}</h2>
      <div className="flex justify-center">
        <div className="sudokuGrid grid grid-cols-3">
          {sudokuGame.puzzle.map((row, boxRowIndex) => {
            return (
              <div key={boxRowIndex}>
                {row.map((num, boxColumnIndex) => {
                  let boxIndex = { boxRowIndex, boxColumnIndex };
                  return (
                    <Box
                      boxNumbers={num}
                      boxIndex={boxIndex}
                      prefilled={prefilled}
                      highlightClasses={highlightClasses}
                      defaultClasses={defaultClasses}
                      onInputChange={handleInputChange}
                      onFocus={addHighlights}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
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
        {goingWell ? (
          <p>Going well so far!</p>
        ) : (
          <p>Looks like you have some wrong numbers</p>
        )}
      </div>
    </div>
  );
}

export default App;
