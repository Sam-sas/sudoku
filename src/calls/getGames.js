import axios from "axios";

//to be moved to env file
const API_URL = "http://localhost:9000";

//grid not array
const stringToGrid = (string) => {
    return string.match(/.{9}/g).map(row =>
        row.split("").map(num => (num === "-" ? 0 : parseInt(num, 10)))
    );
}

//turn into . types
export const getRandomGame = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    let data = response.data;

    data.puzzle = stringToGrid(data.puzzle);
    data.solution = stringToGrid(data.solution);
    
    return data;
  } catch (error) {
    console.error("uh oh", error);
    return null;
  }
}
