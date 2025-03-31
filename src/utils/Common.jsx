
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
