import { useEffect, useState } from "react";
import { useSudoku } from "../state-management/GlobalState";

const Sandbox = ({ innerBoxArray, boxIndex, onFocus, onValueChange }) => {
  const defaultClasses =
    "default w-16 h-16 text-center text-4xl border-2 font-newspaper";
  const size = 3;
  const threeByThreeBox = Array.from({ length: size }, (_, row) =>
    innerBoxArray.slice(row * size, row * size + size)
  );
  
  const runme = (value) => {
    if (isNaN(Number(value))) {
      return;
    } else if (value.length <= 1) {
      onValueChange(value);
    } else {
      onValueChange(value.charAt(value.length - 1));
    }
  };

  return (
    <div className="Box grid border-4 border-solid rounded-md">
      {threeByThreeBox.map((rowArray, rowArrayIndex) => (
        <div key={rowArrayIndex} className="flex">
          {rowArray.map((inputNumber, columnIndex) => {
            let innerBoxIndex = { row: rowArrayIndex, column: columnIndex };
            const inputIndex = rowArrayIndex * 3 + columnIndex;
            let classes = defaultClasses;
            return (
                <input
                key={`${rowArrayIndex}-${columnIndex}`}
                 type="text"
                 value={inputNumber || ""}
                 onChange={(e) => runme(e.target.value, inputIndex)}
                 onFocus={() => onFocus(boxIndex, innerBoxIndex, inputIndex)}
                 className={classes}
               />
            )

          })}
        </div>
      ))}
     
    </div>
  );
};

export default Sandbox;
