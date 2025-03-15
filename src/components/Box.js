import React from "react";

const Box = ({
  boxNumbers,
  boxIndex,
  prefilled,
  highlights,
  highlightClasses,
  defaultClasses,
  onInputChange,
  onFocus,
}) => {
  //turn into 2d array
  const size = 3;

  const threeByThreeBox = Array.from({ length: size }, (_, row) =>
    boxNumbers.slice(row * size, row * size + size)
  );
  
  return (
    <div className="Box grid border-4 border-solid">
      {threeByThreeBox.map((row, boxRowIndex) => (
        <div key={boxRowIndex}>
          {row.map((num, boxColumnIndex) => {
            let innerBoxIndex = {boxRowIndex, boxColumnIndex}
            const inputIndex = boxRowIndex * size + boxColumnIndex;
            // // Check if the current box is in the highlighted row or column
            // const isHighlightedRow = highlights.highlightsIndex === rowIndex;
            // const isHighlightedColumn = highlights.highlightedColumnIndex === colIndex;

            // const highlightClass = isHighlightedRow || isHighlightedColumn ? highlightClasses : defaultClasses;
            // console.log("prefilled" + JSON.stringify(prefilled))
            return (
              <input
                key={`${boxRowIndex}-${boxColumnIndex}`}
                type="text"
                value={num === 0 ? "" : num}
                maxLength={1}
                onChange={(e) =>
                  onInputChange(
                    boxIndex,
                    inputIndex,
                    e.target.value
                  )
                }
                onFocus={() =>
                  onFocus(boxIndex, innerBoxIndex, inputIndex)
                }
                //REMEMBER ME
                className={defaultClasses}
                disabled={prefilled[boxIndex.boxRowIndex][boxIndex.boxColumnIndex][inputIndex] !== 0}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Box;
