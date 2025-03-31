import React, { useEffect, useRef } from "react";
import Heading from "../atoms/Headings";
import RippleLoader from "../atoms/RippleLoader";
import { useSudoku } from "../state-management/GlobalState";
import Sandbox from "../components/Sandbox";

const SudokuBoard = () => {
  const { state, dispatch, startNewGame } = useSudoku();
  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
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
      dispatch({ type: "SELECT_CELL", payload: selectedCell });
    } else {
      dispatch({ type: "SELECT_CELL", payload: state.selectedCell });
    }
  };

  const updateNumber = (value) => {
      if (
        state.selectedCell.outerBoxLocation !== null &&
        state.selectedCell.outerBoxLocation.row !== null &&
        state.selectedCell.outerBoxLocation.column !== null &&
        state.selectedCell.inputIndex !== null
      ) { 
        const row = state.selectedCell.outerBoxLocation.row;
        const column = state.selectedCell.outerBoxLocation.column;
        const inputIndex = state.selectedCell.inputIndex;
        dispatch({
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

  if (state.isLoading) {
    return (
      <RippleLoader />
    )
  }

  return (
    <div className="sudoku-game text-center m-6">
      <Heading
        size="h2"
        title={(state.difficulty ? state.difficulty : "here") + " Mode"}
        fontSize="text-4xl"
      />
      <div className="sudokuGrid">
        loaded
        {state && state.board && state.board.map((row, outerBoxRow) => {
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
