import React from "react";

const PencilMarkings = ({ classes, prefilled }) => {
  let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (prefilled !== 0) {
    return <div className={classes}>{prefilled}</div>;
  }
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-16 h-16 text-center text-sm border-2">
      {possibleNumbers.map((etching, index) => {
        return <span key={index} className="">{etching}</span>;
      })}
    </div>
  );
};

export default PencilMarkings;
