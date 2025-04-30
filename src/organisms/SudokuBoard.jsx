import React, { useEffect, useRef, useState } from "react";
import Heading from "../atoms/Headings";
import RippleLoader from "../atoms/RippleLoader";
import { usePencil, useSudoku } from "../state-management/GlobalState";
import Box from "../components/Box";
import Button from "../atoms/Button";
import Winner from "./Winner";

const SudokuBoard = () => {
  const [isWinState, setIsWinState] = useState(false);
  const { sudokuState, sudokuDispatch, startNewGame } = useSudoku();
  const { pencilState } = usePencil();
  const isFirstRender = useRef(true);

  useEffect(() => {
    sudokuDispatch({ type: "SET_LOADING", payload: true });
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setIsWinState(false);
      startNewGame();
    }
  }, []);

  const selectCell = (boxIndex, innerBoxIndex, inputIndex) => {
    if (boxIndex && innerBoxIndex && (inputIndex || inputIndex === 0)) {
      let selectedCell = {
        outerBoxLocation: {
          row: boxIndex.row,
          column: boxIndex.column,
        },
        innerBoxLocation: {
          row: innerBoxIndex.row,
          column: innerBoxIndex.column,
        },
        inputIndex: inputIndex,
      };
      sudokuDispatch({ type: "SELECT_CELL", payload: selectedCell });
    } else {
      sudokuDispatch({
        type: "SELECT_CELL",
        payload: sudokuState.selectedCell,
      });
    }
  };

  const updateNumber = (value) => {
    if (
      sudokuState.selectedCell.outerBoxLocation !== null &&
      sudokuState.selectedCell.outerBoxLocation.row !== null &&
      sudokuState.selectedCell.outerBoxLocation.column !== null &&
      sudokuState.selectedCell.inputIndex !== null
    ) {
      const row = sudokuState.selectedCell.outerBoxLocation.row;
      const column = sudokuState.selectedCell.outerBoxLocation.column;
      const inputIndex = sudokuState.selectedCell.inputIndex;
      sudokuDispatch({
        type: "UPDATE_CELL",
        payload: {
          row,
          column,
          inputIndex,
          value: Number(value),
        },
      });
    }
  };

  const setTitle = () => {
    let title = " Mode";
    if (pencilState.usePencil) {
      title = "Pencil Mode";
      return title;
    } else if (sudokuState.difficulty) {
      title = sudokuState.difficulty + " Mode";
    } else {
      title = "Empty Mode";
    }
    return title;
  };

  
  const winConditionMet = () => {
    const board = sudokuState.board;
    const solution = sudokuState.solution;
    let checkMatch = [];

    let checkForEmpty = board.some(row => {
      if (row.some(innerRow => innerRow.includes(0))) {
        return true;
      }
    });

    if (checkForEmpty) {
      setIsWinState(false);
      return false;
    }

    board.map((row, index) => {
      let flatBoard = row.flat();
      let flatSolution = solution[index].flat();
      checkMatch.push(flatBoard.every((val, i) => val === flatSolution[i]));
    });

    if (checkMatch.filter(value => value === true).length === 3) {
      console.log("is a match");
      setIsWinState(true);
      return true;
    } else {
      console.log("not a match");
      setIsWinState(false);
      return false;
    }
  };

  if (sudokuState.isLoading) {
    return <RippleLoader />;
  }

  return (
    <div className="relative sudoku-game text-center m-6 motion-preset-slide-up">
      <Heading size="h2" title={setTitle()} fontSize="text-4xl" />
      <div className="sudokuGrid">
        {sudokuState &&
          sudokuState.board &&
          sudokuState.board.map((row, outerBoxRow) => {
            return (
              <div key={outerBoxRow} className="flex">
                {row.map((innerBoxArray, innerBoxColumn) => {
                  let boxIndex = { row: outerBoxRow, column: innerBoxColumn };
                  return (
                    <Box
                      key={`${outerBoxRow}-${innerBoxColumn}`}
                      boxIndex={boxIndex}
                      innerBoxArray={innerBoxArray}
                      onFocus={selectCell}
                      onValueChange={updateNumber}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
      <Button btnName={"Check Progress"} onClickFunction={winConditionMet} />
      {isWinState && <Winner />}
    </div>
  );
};

export default SudokuBoard;
