import axios from "axios";
import { turn2DArray } from "../utils/Common";

//to be moved to env file
const API_URL = "http://localhost:9000";

const stringToGrid = (string) => {
  //Switch string into something readable for me
  let newString = string.replace(/-/g, "0");

  let board = Array.from({ length: 9 }, (_, i) =>
    newString
      .slice(i * 9, i * 9 + 9)
      .split("")
      .map((num) => (num === "-" ? 0 : parseInt(num, 10)))
  );

  let boxes = Array.from({ length: 9 }, () => []);

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const boxIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
      boxes[boxIndex].push(cell);
    });
  });

  return boxes;
};

export const getRandomGame = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    let data = response.data;
    let puzzle = (data.puzzle = turn2DArray(stringToGrid(data.puzzle)));
    let solution = (data.solution = turn2DArray(stringToGrid(data.solution)));
    let finalizedPuzzle = {
      difficulty: data.difficulty,
      puzzle: puzzle,
      solution: solution,
      prefilled: puzzle,
    };
    return finalizedPuzzle;
  } catch (error) {
    console.error("uh oh, can't connect");
    return null;
  }
};

export const getGameDifficulty = async (chosenDifficulty) => {
  try {
    const response = await axios.get(
      `${API_URL}/difficulty/${chosenDifficulty}`
    );

    let data = response.data;
    let puzzle = (data.puzzle = turn2DArray(stringToGrid(data.puzzle)));
    let solution = (data.solution = turn2DArray(stringToGrid(data.solution)));
    let finalizedPuzzle = {
      difficulty: data.difficulty,
      puzzle: puzzle,
      solution: solution,
      prefilled: puzzle,
    };
    return finalizedPuzzle;
  } catch (error) {
    console.error("uh oh can't connect");
    return null;
  }
};
