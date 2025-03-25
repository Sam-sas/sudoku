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

  const [markings, setMarkings] = useState({});

  const handleUpdate = (inputIndex, numbers) => {
    setMarkings((prev) => ({ ...prev, [inputIndex]: numbers }));
  };

  return (
    <div className="Box grid border-4 border-solid rounded-md">
      {threeByThreeBox.map((row, boxRowIndex) => (
        <div key={boxRowIndex} className="flex">
          {row.map((num, boxColumnIndex) => {
            let innerBoxIndex = { boxRowIndex, boxColumnIndex };
            const inputIndex = boxRowIndex * 3 + boxColumnIndex; // Now based on 3x3 box
            let classes = defaultClasses;

            if (highlights.innerBoxLocation && highlights.outerBoxLocation) {
              if (
                highlights.outerBoxLocation.column ===
                  boxIndex.boxColumnIndex &&
                highlights.outerBoxLocation.row === boxIndex.boxRowIndex
              ) {
                classes = rowColumnBoxHighlight;
              } else if (
                highlights.outerBoxLocation.column ===
                  boxIndex.boxColumnIndex &&
                highlights.innerBoxLocation.column ===
                  innerBoxIndex.boxColumnIndex
              ) {
                classes = rowColumnBoxHighlight;
              } else if (
                highlights.outerBoxLocation.row === boxIndex.boxRowIndex &&
                highlights.innerBoxLocation.row === innerBoxIndex.boxRowIndex
              ) {
                classes = rowColumnBoxHighlight;
              }
            }
            if (onStatus) {
              return (
                <PencilMarkings
                  classes={defaultClasses}
                  prefilled={
                    prefilled[boxIndex.boxRowIndex][boxIndex.boxColumnIndex][
                      inputIndex
                    ]
                  }
                  onUpdate={(numbers) => handleUpdate(inputIndex, numbers)}
                />
              );
            }
            return (
              <input
                key={`${boxRowIndex}-${boxColumnIndex}`}
                type="text"
                value={num === 0 ? "" : num}
                maxLength={1}
                onChange={(e) =>
                  onInputChange(boxIndex, inputIndex, e.target.value)
                }
                onFocus={() => onFocus(boxIndex, innerBoxIndex, inputIndex)}
                className={classes}
                readOnly={
                  prefilled[boxIndex.boxRowIndex][boxIndex.boxColumnIndex][
                    inputIndex
                  ] !== 0
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
