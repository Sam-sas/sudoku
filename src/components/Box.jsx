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
  const defaultClasses = "default w-16 h-16 text-center text-4xl border-2";
  const size = 3;
  const threeByThreeBox = Array.from({ length: size }, (_, row) =>
    boxNumbers.slice(row * size, row * size + size)
  );

  // Track pencil markings for each input in the box
  const [markings, setMarkings] = useState({}); // Object to store markings per box

  const handleUpdate = (inputIndex, numbers) => {
    setMarkings((prev) => ({ ...prev, [inputIndex]: numbers }));
  };

  return (
    <div className="Box grid border-4 border-solid">
      {threeByThreeBox.map((row, boxRowIndex) => (
        <div key={boxRowIndex} className="flex">
          {row.map((num, boxColumnIndex) => {
            const inputIndex = boxRowIndex * 3 + boxColumnIndex;

            if (onStatus) {
              return (
                <PencilMarkings
                  key={inputIndex}
                  classes={defaultClasses}
                  prefilled={
                    prefilled[boxIndex.boxRowIndex][boxIndex.boxColumnIndex][
                      inputIndex
                    ]
                  }
                  markedNumbers={markings[inputIndex] || []} // Load existing markings
                  onUpdate={(numbers) => handleUpdate(inputIndex, numbers)} // Update parent state
                />
              );
            }

            return (
              <input
                key={inputIndex}
                type="text"
                value={num === 0 ? "" : num}
                maxLength={1}
                onChange={(e) =>
                  onInputChange(boxIndex, inputIndex, e.target.value)
                }
                onFocus={() =>
                  onFocus(boxIndex, { row: boxRowIndex, col: boxColumnIndex }, inputIndex)
                }
                className={defaultClasses}
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
