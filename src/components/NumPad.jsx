import React from "react";

const NumPad = ({ onNumberClick }) => {
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const runNumpad = (number) => {
    onNumberClick(number);
  };

  return (
    <div className="numpad grid grid-cols-3 grid-rows-3 border-4 border-solid">
      {possibleNumbers.map((numpad, index) => {
        return (
          <button
            key={index}
            className="flex justify-center items-center text-center text-7xl border-2"
            value={numpad}
            onClick={() => runNumpad(numpad)}
          >
            {numpad}
          </button>
        );
      })}
    </div>
  );
};

export default NumPad;
