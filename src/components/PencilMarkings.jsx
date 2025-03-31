import React, { useState, useEffect } from "react";

const PencilMarkings = ({ classes, prefilled, markedNumbers, onUpdate }) => {
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [numberMarked, setNumberMarked] = useState(markedNumbers);

  useEffect(() => {
    setNumberMarked(markedNumbers); 
  }, [markedNumbers]);

  const handleKeyDown = (event) => {
    if (/^[1-9]$/.test(event.key)) {
      const number = parseInt(event.key, 10);

      setNumberMarked((prevNumbers) => {
        const updatedNumbers = prevNumbers.includes(number)
          ? prevNumbers.filter((num) => num !== number)
          : [...prevNumbers, number]; 

        onUpdate(updatedNumbers);
        return updatedNumbers;
      });
    }
  };

  if (prefilled !== 0) {
    return <div className={classes}>{prefilled}</div>;
  }

  return (
    <div
      className="grid grid-cols-3 grid-rows-3 w-16 h-16 text-center text-sm border-2"
      tabIndex={0} // Allows focusing
      onKeyDown={handleKeyDown}
    >
      {possibleNumbers.map((etching, index) => {
        return (
          <span
            key={index}
            className={`pencilMarking ${
              numberMarked.includes(etching) ? "visible" : "invisible"
            }`}
          >
            {etching}
          </span>
        );
      })}
    </div>
  );
};

export default PencilMarkings;
