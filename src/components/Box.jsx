import React, { useState } from "react";
import PencilMarkings from "./PencilMarkings";

const Box = ({
  boxNumbers,
  boxIndex,
  prefilled,
  highlights,
  onInputChange,
  onFocus,
  onStatus,
}) => {
  const rowColumnBoxHighlight =
    "w-16 h-16 text-center text-4xl border-2 font-newspaper";
  const defaultClasses =
    "default w-16 h-16 text-center text-4xl border-2 font-newspaper";
  const size = 3;
  const threeByThreeBox = Array.from({ length: size }, (_, row) =>
    boxNumbers.slice(row * size, row * size + size)
  );

  const [inputValue, setInputValue] = useState(0);
  const [markings, setMarkings] = useState({});

  const handleUpdate = (inputIndex, numbers) => {
    setMarkings((prev) => ({ ...prev, [inputIndex]: numbers }));
  };

  const runme = (value) => {
    if (value.length <= 1) {
      onInputChange(value); 
    } else {
      onInputChange(value.charAt(value.length - 1));
    }
  };

  return (
    <div className="Box grid border-4 border-solid rounded-md">
      {threeByThreeBox.map((row, boxRowIndex) => (
        <div key={boxRowIndex} className="flex">
          {row.map((num, boxColumnIndex) => {
            let innerBoxIndex = { row: boxRowIndex, column: boxColumnIndex };
            const inputIndex = boxRowIndex * 3 + boxColumnIndex; // Now based on 3x3 box
            let classes = defaultClasses;

            // if (highlights.innerBoxLocation && highlights.outerBoxLocation) {
            //   if (
            //     highlights.outerBoxLocation.column ===
            //       boxIndex.boxColumnIndex &&
            //     highlights.outerBoxLocation.row === boxIndex.boxRowIndex
            //   ) {
            //     classes = rowColumnBoxHighlight;
            //   } else if (
            //     highlights.outerBoxLocation.column ===
            //       boxIndex.boxColumnIndex &&
            //     highlights.innerBoxLocation.column ===
            //       innerBoxIndex.boxColumnIndex
            //   ) {
            //     classes = rowColumnBoxHighlight;
            //   } else if (
            //     highlights.outerBoxLocation.row === boxIndex.boxRowIndex &&
            //     highlights.innerBoxLocation.row === innerBoxIndex.boxRowIndex
            //   ) {
            //     classes = rowColumnBoxHighlight;
            //   }
            // }
            // if (onStatus) {
            //   return (
            //     <PencilMarkings
            //       classes={defaultClasses}
            //       prefilled={
            //         prefilled[boxIndex.boxRowIndex][boxIndex.boxColumnIndex][
            //           inputIndex
            //         ]
            //       }
            //       onUpdate={(numbers) => handleUpdate(inputIndex, numbers)}
            //     />
            //   );
            // }
            return (
              <input
                key={`${boxRowIndex}-${boxColumnIndex}`}
                type="number"
                value={num === 0 ? "" : num}
                onChange={(e) => runme(e.target.value)}
                onFocus={() => onFocus(boxIndex, innerBoxIndex, inputIndex)}
                className={classes}
                readOnly={
                  prefilled[boxIndex.row][boxIndex.column][inputIndex] !== 0
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Box;
