import React from "react";
import { motion } from "motion/react";
import { useSudoku } from "../state-management/GlobalState";

const NumPad = () => {
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { sudokuState, sudokuDispatch } = useSudoku();

  const updateSelectedCell = (chosenNumber) => {
    if (
      sudokuState.selectedCell.outerBoxLocation &&
      (sudokuState.selectedCell.inputIndex ||
        sudokuState.selectedCell.inputIndex === 0)
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
          value: chosenNumber,
        },
      });
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
