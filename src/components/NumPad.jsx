import React from "react";
import Heading from "../atoms/Headings";

const NumPad = ({ onNumberClick }) => {
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const runNumpad = (number) => {
    onNumberClick(number);
  };

  return (
    <div className="flex flex-col">
      <Heading size="h2" title="Number Pad" fontSize="text-4xl" />
      <div className="numpad grid grid-cols-3 grid-rows-3 border-4 border-solid border-parchment-700 rounded-md">
        {possibleNumbers.map((numpad, index) => {
          return (
            <button
              key={index}
              className="flex justify-center items-center text-center text-7xl border-2 font-newspaper text-coriander-950 border-parchment-500"
              value={numpad}
              onClick={() => runNumpad(numpad)}
            >
              {numpad}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NumPad;
