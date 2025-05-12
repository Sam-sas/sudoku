export const turn2DArray = (boxes) => {
  const size = 3;
  const values = Object.values(boxes);

  const threeByThreeBox = Array.from({ length: size }, (_, row) =>
    values.slice(row * size, row * size + size)
  );

  return threeByThreeBox;
};

export const addHighlights = (innerBoxIndex, sudokuState, boxIndex) => {
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
      return "bg-[var(--highlight-color)]";
    }
  }

  return "";
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

export const isSameLocation = (location, incomingLocation) => {
  if (!location || !incomingLocation || !location.outerBoxLocation || !incomingLocation.outerBoxLocation)  return false;
  return (
    location.outerBoxLocation.row === incomingLocation.outerBoxLocation.row &&
    location.outerBoxLocation.column === incomingLocation.outerBoxLocation.column &&
    location.innerBoxLocation.row === incomingLocation.innerBoxLocation.row &&
    location.innerBoxLocation.column === incomingLocation.innerBoxLocation.column &&
    location.inputIndex === incomingLocation.inputIndex
  );
};

export const checkLocationExistence = (location) => {
  if (
    !location ||
    !location.outerBoxLocation ||
    !location.innerBoxLocation ||
    location.inputIndex === undefined
  ) {
    return false;
  }

  return true;
}