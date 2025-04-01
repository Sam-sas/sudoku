import { m } from "motion/react";

//remove this and move to getGames
export const turn2DArray = (boxes) => {
  const size = 3;
  const values = Object.values(boxes); // Get the values from the object

  // Ensure each box has exactly 9 numbers, then create the 2D array
  const threeByThreeBox = Array.from({ length: size }, (_, row) =>
    values.slice(row * size, row * size + size)
  );

  return threeByThreeBox;
};

export const addHighlights = (innerBoxIndex, sudokuState, boxIndex) => {
  const highlightClasses = "bg-coriander-300";
  const defaultClasses = "";
  let classes = defaultClasses;

  if (
    sudokuState.selectedCell.innerBoxLocation &&
    sudokuState.selectedCell.outerBoxLocation &&
    boxIndex
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

    const matchingCells = getMatchingCells(sudokuState);

    const isMatchingValue = matchingCells.some(
      (cell) =>
        cell.outerRow === boxIndex.row && 
        cell.outerCol === boxIndex.column &&
        cell.cellIndex === innerBoxIndex.row * 3 + innerBoxIndex.column
    );

    if (sameOuterBox || sameColumn || sameRow || isMatchingValue) {
      classes = highlightClasses;
    }
  }

  return classes;
};

const getMatchingCells = (sudokuState) => {
  const { selectedCell, board } = sudokuState;
  const { outerBoxLocation, innerBoxLocation, inputIndex } = selectedCell;
  
  if (!outerBoxLocation || !innerBoxLocation) {
    return [];
  }

  const selectedValue = board[outerBoxLocation.row][outerBoxLocation.column][inputIndex];

  if (selectedValue === 0) {
    return [];
  }

  const matchingCells = [];
  board.forEach((outerBox, outerRow) => {
    outerBox.forEach((innerBox, outerCol) => {
      innerBox.forEach((cellValue, cellIndex) => {
        if (cellValue === selectedValue) {
          matchingCells.push({ outerRow, outerCol, cellIndex });
        }
      });
    });
  });

  return matchingCells;
}
