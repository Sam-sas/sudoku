import React from "react";

const Box = ({
  boxKey,
  boxNumbers,
  prefilled,
  highlights,
  highlightClasses,
  defaultClasses,
  onInputChange,
  onFocus
}) => {

  //turn into 2d array

  return (
    <div className="Box grid grid-cols-3 grid-rows-3 border-4 border-solid">
      {boxNumbers.map((num, index) => {
        return (
          <input
            key={index}
            type="text"
            value={num === 0 ? "" : num}
            // onChange={(e) => onInputChange(boxKey, index, e.target.value)}
            // onFocus={() => onFocus(boxKey, row, column)}
            // className={classes}
            disabled={prefilled[boxKey][index] !== 0}
          />
        );
      })}
    </div>
  );
};

export default Box;