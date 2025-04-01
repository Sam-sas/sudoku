import React, { useState, useEffect } from "react";
import { addHighlights } from "../utils/Common";
import { useSudoku } from "../state-management/GlobalState";

const PencilMarkings = ({
  classes,
  prefilled,
  markedNumbers,
  onUpdate,
  innerBoxIndex,
  boxIndex,
  inputIndex,
}) => {
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [numberMarked, setNumberMarked] = useState(markedNumbers);
  const { sudokuState, sudokuDispatch } = useSudoku();
  const [highlighting, setHighlighting] = useState(" ");

  //move to global state?
  const setCell = () => {
    if (!boxIndex || !innerBoxIndex || (inputIndex === undefined)) return;
  
    const selectedCell = {
      outerBoxLocation: { row: boxIndex.row, column: boxIndex.column },
      innerBoxLocation: { row: innerBoxIndex.row, column: innerBoxIndex.column },
      inputIndex,
    };
  
    // Directly compare instead of JSON.stringify
    const isSameCell =
      sudokuState.selectedCell.outerBoxLocation?.row === selectedCell.outerBoxLocation.row &&
      sudokuState.selectedCell.outerBoxLocation?.column === selectedCell.outerBoxLocation.column &&
      sudokuState.selectedCell.innerBoxLocation?.row === selectedCell.innerBoxLocation.row &&
      sudokuState.selectedCell.innerBoxLocation?.column === selectedCell.innerBoxLocation.column &&
      sudokuState.selectedCell.inputIndex === selectedCell.inputIndex;
  
    if (!isSameCell) {
      sudokuDispatch({ type: "SELECT_CELL", payload: selectedCell });
    }
  };

  useEffect(() => {
    if (markedNumbers) {
      setNumberMarked(markedNumbers);
    }
  }, [markedNumbers]);

  useEffect(() => {
    if (sudokuState.selectedCell) {
      setHighlighting(addHighlights(innerBoxIndex, sudokuState, boxIndex));
    }
  }, [sudokuState.selectedCell, innerBoxIndex, boxIndex]);

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

  if (prefilled) {
    return (
      <div onClick={() => setCell()} className={classes + " " + highlighting}>
        {prefilled}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-3 grid-rows-3 w-16 h-16
        text-center text-4xl border-2 font-newspaper text-sm ${highlighting}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => setCell()}
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
