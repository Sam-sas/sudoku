import { useEffect, useState } from "react";
import { useSudoku } from "../state-management/GlobalState";
import PencilMarkings from "./PencilMarkings";

const Sandbox = ({ innerBoxArray, boxIndex, onFocus, onValueChange }) => {
  const { state } = useSudoku();
  const [pencilMarkings, setPencilMarkings] = useState({});

  const highlightClasses =
    "bg-coriander-400";
  const defaultClasses =
    "";
  const size = 3;
  const threeByThreeBox = Array.from({ length: size }, (_, row) =>
    innerBoxArray.slice(row * size, row * size + size)
  );

  const singleInput = (value) => {
    console.log("singleinput");
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
      state.selectedCell.innerBoxLocation &&
      state.selectedCell.outerBoxLocation
    ) {
      const { outerBoxLocation, innerBoxLocation } = state.selectedCell;
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
  }

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


            if (state.usePencil) {
              console.log("hi")
              return (
                <PencilMarkings
                  classes={"w-16 h-16 text-center text-4xl border-2 font-newspaper"}
                  prefilled={
                    state.prefilled[boxIndex.row][boxIndex.column][
                      inputIndex
                    ]
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
                  state.prefilled[boxIndex.row][boxIndex.column][inputIndex] !== 0
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Sandbox;
