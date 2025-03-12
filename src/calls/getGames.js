import axios from "axios";

//to be moved to env file
const API_URL = "http://localhost:9000";

//turns the return - into a 0 for human readability and turns solution string into array
const stringToGrid = (string) => {
    return string.match(/.{9}/g).map(row =>
        row.split("").map(num => (num === "-" ? 0 : parseInt(num, 10)))
    );
}

const finalPuzzle = (difficulty, puzzle, solution)  => {
  let finalizedPuzzle = {
    difficulty,
    puzzle: {},
    solution: {},
    prefilled: {},
  };

  finalizedPuzzle.puzzle = createBoxes(puzzle);
  finalizedPuzzle.solution = createBoxes(solution);
  finalizedPuzzle.prefilled = createBoxes(puzzle);
  return finalizedPuzzle;
}

const createBoxes = (sudokuGrid) => {
  let maxArrayIndex = 9;
  let boxes = {
    box1: [],
    box2: [],
    box3: [],
    box4: [],
    box5: [],
    box6: [],
    box7: [],
    box8: [],
    box9: [],
  };

  for (let singleArray in sudokuGrid) {
    sudokuGrid[singleArray].forEach((number, index) => {
      placeInBox(number, index, boxes, maxArrayIndex);
    });
  }
  return boxes;
}

const placeInBox = (number, index, boxes, max) => {
    switch (true) {
    case (index < 3 && boxes.box1.length < max):
      return boxes.box1.push(number);
    case (index >= 3 && index <= 5 && boxes.box2.length < max):
      return boxes.box2.push(number);
    case (index >= 6 && index <= 8 && boxes.box3.length < max):
      return boxes.box3.push(number);
    case (index < 3 && boxes.box4.length < max):
      return boxes.box4.push(number);
    case (index >= 3 && index <= 5 && boxes.box5.length < max):
      return boxes.box5.push(number);
    case (index >= 6 && index <= 8 && boxes.box6.length < max):
      return boxes.box6.push(number);
    case (index < 3 && boxes.box7.length < max):
      return boxes.box7.push(number);
    case (index >= 3 && index <= 5 && boxes.box8.length < max):
      return boxes.box8.push(number);
    case (index >= 6 && index <= 8 && boxes.box9.length < max):
      return boxes.box9.push(number);
    default: 
      return []; 
    }
  }


export const getRandomGame = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    let data = response.data;
    // console.log("What is initially pulled: " + JSON.stringify(data));
    data.puzzle = stringToGrid(data.puzzle);
    data.solution = stringToGrid(data.solution);
    // console.log(data.puzzle);
    let finalizedPuzzle = finalPuzzle(data.difficulty, data.puzzle, data.solution);
    return finalizedPuzzle;
  } catch (error) {
    console.error("uh oh", error);
    return null;
  }
}