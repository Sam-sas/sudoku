import { useEffect, useState } from "react";
import { usePencil, useSudoku } from "../state-management/GlobalState";
import PencilMarkings from "./PencilMarkings";

const Box = ({ innerBoxArray, boxIndex, onFocus, onValueChange }) => {
  const { sudokuState } = useSudoku();
  const { pencilState, pencilDispatch } = usePencil();
  const [pencilMarkings, setPencilMarkings] = useState({});

  useEffect(() => {
    if (pencilState.undoAllMarkings) {
      setPencilMarkings({});
      pencilDispatch({
        type: "SET_UNDO_MARKINGS",
        payload: !pencilState.undoAllMarkings,
      });
    }
  }, [pencilState.undoAllMarkings]);

  const highlightClasses = "bg-coriander-400";
  const defaultClasses = "";
  const size = 3;
  const threeByThreeBox = Array.from({ length: size }, (_, row) =>
    innerBoxArray.slice(row * size, row * size + size)
  );

  const singleInput = (value) => {
    if (isNaN(Number(value))) {
      return;
    } else if (value.length <= 1) {
      onValueChange(value);
    } else {
      onValueChange(value.charAt(value.length - 1));
    }
  };

  const addHighlights = (innerBoxIndex) => {
    let classes = defaultClasses;

    if (
      sudokuState.selectedCell.innerBoxLocation &&
      sudokuState.selectedCell.outerBoxLocation
    ) {
      const { outerBoxLocation, innerBoxLocation } = sudokuState.selectedCell;
      const sameOuterBox =
        outerBoxLocation.column === boxIndex.column &&
        outerBoxLocation.row === boxIndex.row;
      const sameColumn =
        outerBoxLocation.column === boxIndex.column &&
        innerBoxLocation.column === innerBoxIndex.column;
      const sameRow =
        outerBoxLocation.row === boxIndex.row &&
        innerBoxLocation.row === innerBoxIndex.row;

      if (sameOuterBox || sameColumn || sameRow) {
        classes = highlightClasses;
      }
    }

    return classes;
  };

  const pencilMarkUpdate = (inputIndex, numbers) => {
    setPencilMarkings((prev) => ({
      ...prev,
      [inputIndex]: numbers,
    }));
  };

  return (
    <div className="Box grid border-4 border-solid rounded-md">
      {threeByThreeBox.map((rowArray, rowArrayIndex) => (
        <div key={rowArrayIndex} className="flex">
          {rowArray.map((inputNumber, columnIndex) => {
            let innerBoxIndex = { row: rowArrayIndex, column: columnIndex };
            const inputIndex = rowArrayIndex * 3 + columnIndex;
            let classes = addHighlights(innerBoxIndex);

            if (pencilState.usePencil || (pencilMarkings && pencilMarkings[inputIndex]?.length > 0))  {
              return (
                <PencilMarkings
                  key={columnIndex}
                  classes={
                    "flex justify-center items-center w-16 h-16 text-center text-4xl border-2 font-newspaper "
                  }
                  prefilled={
                    sudokuState.board[boxIndex.row][boxIndex.column][inputIndex]
                  }
                  markedNumbers={pencilMarkings[inputIndex] || []}
                  onUpdate={(numbers) => pencilMarkUpdate(inputIndex, numbers)}
                />
              );
            }

            return (
              <input
                key={`${rowArrayIndex}-${columnIndex}`}
                type="text"
                value={inputNumber || ""}
                onChange={(e) => singleInput(e.target.value, inputIndex)}
                onFocus={() => onFocus(boxIndex, innerBoxIndex, inputIndex)}
                className={`w-16 h-16 text-center text-4xl border-2 font-newspaper ${classes}`}
                readOnly={
                  sudokuState.prefilled[boxIndex.row][boxIndex.column][
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
