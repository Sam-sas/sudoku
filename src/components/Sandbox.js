import React from "react";
//holder area
const SandBox = () => {
  const addHighlights = (boxKey, row, column) => {
    const boxIndex = parseInt(boxKey.substr(3));

    // Calculate the row and column ranges for the box
    const boxRowStart = Math.floor(boxIndex / 3) * 3;
    const boxColStart = (boxIndex % 3) * 3;
    // Update the highlights state with the current box, row, and column
    setHighlights({
      boxKey,
      row,
      column,
      boxRowStart,
      boxColStart,
    });
  };

  return <div className>
     <div className="Box grid grid-cols-3 grid-rows-3 border-4 border-solid">
      {boxNumbers.map((num, index) => {
       const row = Math.floor(index / 3);  // Local row within the box (0-2)
       const column = index % 3;          // Local column within the box (0-2)

       // Check if the current row/column is in the same row/column as the highlighted one within the box's boundaries
       const isSameRow = highlights.row === row;
       const isSameCol = highlights.column === column;

       // Check if this row and column are inside the current box
       const isInBoxRow = row + highlights.boxRowStart >= highlights.boxRowStart && row + highlights.boxRowStart <= highlights.boxRowStart + 2;
       const isInBoxCol = column + highlights.boxColStart >= highlights.boxColStart && column + highlights.boxColStart <= highlights.boxColStart + 2;

       // Highlight if it matches row or column in the same box
       const isHighlighted = (isSameRow || isSameCol) && (isInBoxRow && isInBoxCol);

       // Set classes based on whether it's highlighted
       const classes = isHighlighted ? highlightClasses : defaultClasses;
       console.log(boxNumbers[0][0]);
        return (
          <input
            key={index}
            type="text"
            value={num === 0 ? "" : num}
            // onChange={(e) => onInputChange(boxKey, index, e.target.value)}
            // onFocus={() => onFocus(boxKey, row, column)}
            // className={classes}
            readOnly={prefilled[boxKey][index] !== 0}
          />
        );
      })}
    </div>

    {Object.keys(sudokuGame.puzzle).map((boxKey, index) => {
            return (
              <Box
              key={boxKey}
              boxKey={boxKey}
              boxNumbers={sudokuGame.puzzle[boxKey]}
              prefilled={prefilled}
              highlights={highlights}
              highlightClasses={highlightClasses}
              defaultClasses={defaultClasses}
              onInputChange={handleInputChange}
              onFocus={addHighlights}
              />
            );
          })}
  </div>;
};

export default SandBox;
