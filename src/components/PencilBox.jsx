import { useEffect, useState } from "react";
import { usePencil, useSudoku } from "../state-management/GlobalState";
import { addHighlights, isSameLocation } from "../utils/Common";

const PencilBox = ({ innerBoxIndex, boxIndex, inputIndex, pencilValues }) => {
  const [highlighting, setHighlighting] = useState(" ");
  const { sudokuState, sudokuDispatch } = useSudoku();
  const { pencilDispatch } = usePencil();
  const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    if (sudokuState.selectedCell) {
      setHighlighting(addHighlights(innerBoxIndex, sudokuState, boxIndex));
    }
  }, [sudokuState.selectedCell, innerBoxIndex, boxIndex]);

  // selecting cell
  const setCell = () => {
    if (
      !boxIndex ||
      !innerBoxIndex ||
      inputIndex === undefined ||
      !sudokuState.selectedCell
    )
      return;

    const selectedCell = {
      outerBoxLocation: { row: boxIndex.row, column: boxIndex.column },
      innerBoxLocation: {
        row: innerBoxIndex.row,
        column: innerBoxIndex.column,
      },
      inputIndex,
    };

    const isSameCell = isSameLocation(sudokuState.selectedCell, selectedCell);

    if (!isSameCell) {
      sudokuDispatch({ type: "SELECT_CELL", payload: selectedCell });
    }
  };

  const handleKeyDown = (event) => {
    if (/^[1-9]$/.test(event.key)) {
      const number = parseInt(event.key, 10);
      if (
        sudokuState.selectedCell &&
        sudokuState.selectedCell.outerBoxLocation
      ) {
        pencilDispatch({
          type: "SET_PENCIL_BOXES",
          payload: {
            location: sudokuState.selectedCell,
            etching: number,
          },
        });
      }
    }
  };

  const checkBoxValues = (number) => {
    if(pencilValues && pencilValues.includes(number)) {
      return "visible";
    }
    return "invisible";
  };

  //set up prefilled boxes
  if (sudokuState.board[boxIndex.row][boxIndex.column][inputIndex]) {
    let prefilled =
      sudokuState.board[boxIndex.row][boxIndex.column][inputIndex];
    const isBigNumber = typeof prefilled === "number" && prefilled > 0;
    if (isBigNumber) {
      return (
        <span
          onClick={() => setCell()}
          className={
            "pencil-box width-33 flex items-center justify-center text-center md:text-4xl sm:text-3xl text-2xl border font-newspaper " +
            highlighting
          }
        >
          {prefilled}
        </span>
      );
    }
  }

  //set up pencil boxes
  return (
    <div
      className={`pencil-box width-33 flex items-center justify-center flex-row flex-wrap text-center md:text-4xl sm:text-3xl text-2xl border  font-newspaper  ${highlighting}`}
      onClick={() => setCell()}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {possibleNumbers.map((etching, index) => {
        return (
          <span
            key={index}
            className={`width-33 pencilMarking text-xs ${
              checkBoxValues(etching)
            }`}
          >
            {etching}
          </span>
        );
      })}
    </div>
  );
};

export default PencilBox;
