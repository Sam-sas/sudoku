import React from "react";
import { motion } from "motion/react";

const NumPad = ({ onNumberClick }) => {
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const runNumpad = (number) => {
    onNumberClick(number);
  };

  return (
    <div className="numpad grid grid-cols-3 grid-rows-3 border-4 border-solid rounded-md">
      {possibleNumbers.map((numpad, index) => {
        return (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            key={index}
            className="flex justify-center items-center text-center text-7xl border-2 font-newspaper"
            value={numpad}
            onClick={() => runNumpad(numpad)}
          >
            {numpad}
          </motion.button>
        );
      })}
    </div>
  );
};

export default NumPad;
