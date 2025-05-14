import React from "react";
import { motion } from "motion/react";
import { usePencil, useSudoku } from "../state-management/GlobalState";
import { checkLocationExistence } from "../utils/Common";

const NumPad = () => {
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { sudokuState, sudokuDispatch } = useSudoku();
  const { pencilState, pencilDispatch } = usePencil();

  const updateSelectedCell = (chosenNumber) => {
    if (checkLocationExistence(sudokuState.selectedCell)) {
      const row = sudokuState.selectedCell.outerBoxLocation.row;
      const column = sudokuState.selectedCell.outerBoxLocation.column;
      const inputIndex = sudokuState.selectedCell.inputIndex;

      if (pencilState.usePencil) {
        pencilDispatch({
          type: "SET_PENCIL_BOXES",
          payload: {
            location: sudokuState.selectedCell,
            etching: chosenNumber,
          },
        });
      } else {
        sudokuDispatch({
          type: "UPDATE_CELL",
          payload: {
            row,
            column,
            inputIndex,
            value: chosenNumber,
          },
        });
      }
    }
  };

  return (
    <div className="numpad grid grid-cols-3 grid-rows-3 border-4 border-solid rounded-md">
      {possibleNumbers.map((numpad, index) => {
        return (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            key={index}
            className="button flex justify-center items-center text-center text-7xl border-2 font-newspaper"
            value={numpad}
            onClick={() => updateSelectedCell(numpad)}
          >
            {numpad}
          </motion.button>
        );
      })}
    </div>
  );
};

export default NumPad;
