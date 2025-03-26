import React, { useEffect, useRef, useState } from "react";
import Heading from "../atoms/Headings";
import { getRandomGame } from "../calls/getGames";
import { turn2DArray } from "../utils/Common";
import RippleLoader from "../atoms/RippleLoader";
import Box from "../components/Box";

const SudokuBoard = () => {
  const [sudokuGame, setSudokuGame] = useState({
    puzzle: null,
    solution: null,
    difficulty: null,
  });
  const [prefilled, setPrefilled] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedCell, setSelectedCell] = useState({
    outerBoxLocation: null,
    innerBoxLocation: null,
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
    const pulledGame = await getRandomGame();
    if (pulledGame && pulledGame.difficulty) {
      setSudokuGame({
        puzzle: turn2DArray(pulledGame.puzzle),
        solution: turn2DArray(pulledGame.solution),
        difficulty: pulledGame.difficulty,
      });
      setPrefilled(turn2DArray(pulledGame.prefilled));
      setLoading(false);
    }
  };

  const focusedCellCapture = (boxIndex, innerBoxIndex, inputIndex) => {
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


  if (loading) {
    return <RippleLoader />;
  }
  return (
    <div className="sudoku-game text-center m-6">
      <Heading size="h2" title={sudokuGame.difficulty.toUpperCase() + " Mode" } fontSize="text-4xl" />
      <div className="sudokuGrid">
        {sudokuGame.puzzle.map((row, boxRowIndex) => {
          return (
            <div key={boxRowIndex} className="flex">
              {row.map((num, boxColumnIndex) => {
                let boxIndex = { boxRowIndex, boxColumnIndex };
                return (
                  <Box
                    boxNumbers={num}
                    boxIndex={boxIndex}
                    prefilled={prefilled}
                    highlights={selectedCell}
                    onInputChange={handleInputChange}
                    onFocus={focusedCellCapture}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SudokuBoard;
