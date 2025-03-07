import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import { getRandomGame } from './calls/getGames';

function App() {
  const [sudoku, setSudoku] = useState([]);
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [isValid, setIsValid] = useState(null);

  const isFirstRender = useRef(true);


  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false;
      fetchSudoku();
    }
  }, []);

  const fetchSudoku = async () => {
    const data = await getRandomGame();
    if (data) {
      console.log(data);
      //comes in the json
      setSudoku(data.puzzle);
      setSolution(data.solution);
      setDifficulty(data.difficulty);
      //setup
      setBoard(data.puzzle.map(row => [...row]));
    };
  };


  const handleChange = (row, col, value) => {
    if(sudoku[row][col] !== 0) return;
    if (value < 1 || value > 9) return;
    const newBoard = board.map(rowArr => [...rowArr]);
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  //need to check against solution
  const checkSolution = () => {
    const isCorrect = JSON.stringify(board) === JSON.stringify(solution);
    setIsValid(isCorrect);
  };


  return (
    <div className="App">
      <h1>Sudoku Game</h1>
            <table>
                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((num, colIndex) => (
                                <td key={colIndex}>
                                    <input
                                        type="text"
                                        value={num || ""}
                                        onChange={(e) =>
                                            handleChange(rowIndex, colIndex, parseInt(e.target.value) || 0)
                                        }
                                        disabled={sudoku[rowIndex][colIndex] !== 0}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={checkSolution}>Check Solution</button>
            <button onClick={fetchSudoku}>New Game</button>
            {isValid !== null && (
                <p>{isValid ? "✅ Correct Solution!" : "❌ Incorrect Solution"}</p>
            )}
    </div>
  );
}

export default App;
