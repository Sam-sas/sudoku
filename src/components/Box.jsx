import { useEffect } from "react";
import { usePencil, useSudoku } from "../state-management/GlobalState";
import { addHighlights, isSameLocation } from "../utils/Common";
import PencilBox from "./PencilBox";

const Box = ({ innerBoxArray, boxIndex, onFocus, onValueChange }) => {
  const { sudokuState } = useSudoku();
  const { pencilState, pencilDispatch } = usePencil();
  // const [pencilMarkings, setPencilMarkings] = useState({});

  useEffect(() => {
    if (pencilState.undoAllMarkings) {
      pencilDispatch({
        type: "CLEAR_PENCIL_BOXES",
      });
      pencilDispatch({
        type: "SET_UNDO_MARKINGS",
        payload: !pencilState.undoAllMarkings,
      });
    }
  }, [pencilState.undoAllMarkings, pencilState.pencilBoxes]);

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

  return (
    <div className="Box grid border-4 border-solid rounded-md">
      {threeByThreeBox.map((rowArray, rowArrayIndex) => (
        <div key={rowArrayIndex} className="flex">
          {rowArray.map((inputNumber, columnIndex) => {
            let innerBoxIndex = { row: rowArrayIndex, column: columnIndex };
            const inputIndex = rowArrayIndex * 3 + columnIndex;
            let classes = addHighlights(innerBoxIndex, sudokuState, boxIndex);

            if (pencilState.usePencil) {
              const currentLocation = {
                outerBoxLocation: boxIndex,
                innerBoxLocation: innerBoxIndex,
                inputIndex: inputIndex,
              };
              const stringifiedLocation = JSON.stringify(currentLocation);
              const pencilValues =
                pencilState.pencilBoxes.get(stringifiedLocation);

              return (
                <PencilBox
                  key={columnIndex}
                  classes={
                    "flex justify-center items-center lg:size-16 size-12 text-center text-4xl border-2 font-newspaper "
                  }
                  innerBoxIndex={innerBoxIndex}
                  boxIndex={boxIndex}
                  inputIndex={inputIndex}
                  pencilValues={pencilValues}
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
                className={`md:size-16 sm:size-12 size-10 text-center md:text-4xl sm:text-3xl border-2 font-newspaper ${classes}`}
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
