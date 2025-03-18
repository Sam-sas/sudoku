import axios from "axios";

//to be moved to env file
const API_URL = "http://localhost:9000";

const stringToGrid = (string) => {
  //turns the return - into a 0 for human readability and turns solution string into array
 let newString = string.replace(/-/g, "0");

 let board = Array.from({ length: 9 }, (_, i) =>
  newString
    .slice(i * 9, i * 9 + 9)
    .split("")
    .map(num => (num === "-" ? 0 : parseInt(num, 10)))
);

// Step 2: Extract 3x3 boxes
let boxes = Array.from({ length: 9 }, () => []);

for (let boxRow = 0; boxRow < 3; boxRow++) {
  for (let boxCol = 0; boxCol < 3; boxCol++) {
    let boxIndex = boxRow * 3 + boxCol;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boxes[boxIndex].push(board[boxRow * 3 + i][boxCol * 3 + j]);
      }
    }
  }
}
return boxes;
}


export const getRandomGame = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    let data = response.data;
    console.log("What is initially pulled: " + JSON.stringify(data));
    let puzzle = data.puzzle = stringToGrid(data.puzzle);
    let solution = data.solution = stringToGrid(data.solution);
    let finalizedPuzzle = {
      difficulty: data.difficulty,
      puzzle: puzzle,
      solution: solution,
      prefilled: puzzle,
    };
    return finalizedPuzzle;
  } catch (error) {
    console.error("uh oh", error);
    return null;
  }
}