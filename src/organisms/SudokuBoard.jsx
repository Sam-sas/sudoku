import React, { useEffect, useRef } from "react";
import Heading from "../atoms/Headings";
import RippleLoader from "../atoms/RippleLoader";
import { useSudoku } from "../state-management/GlobalState";
import Sandbox from "../components/Sandbox";

const SudokuBoard = () => {
  const { sudokuState, sudokuDispatch, startNewGame } = useSudoku();
  const isFirstRender = useRef(true);

  useEffect(() => {
    sudokuDispatch({ type: 'SET_LOADING', payload: true });
    if (isFirstRender.current) {
      isFirstRender.current = false;
      startNewGame();
    }
  }, []);

  const selectCell = (boxIndex, innerBoxIndex, inputIndex) => {
    if (boxIndex && innerBoxIndex && inputIndex) {
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
      sudokuDispatch({ type: "SELECT_CELL", payload: sudokuState.selectedCell });
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

  if (sudokuState.isLoading) {
    return (
      <RippleLoader />
    )
  }

  return (
    <div className="sudoku-game text-center m-6">
      <Heading
        size="h2"
        title={(sudokuState.difficulty ? sudokuState.difficulty : "here") + " Mode"}
        fontSize="text-4xl"
      />
      <div className="sudokuGrid">
        loaded
        {sudokuState && sudokuState.board && sudokuState.board.map((row, outerBoxRow) => {
          return (
            <div key={outerBoxRow} className="flex">
              {row.map((innerBoxArray, innerBoxColumn) => {
                let boxIndex = { row: outerBoxRow, column: innerBoxColumn };
                return (
                  <Sandbox
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
    </div>
  );
};

export default SudokuBoard;
