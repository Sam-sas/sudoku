import Heading from "../atoms/Headings";
import DesktopNumPad from "../organisms/DesktopNumPad";
import Options from "../organisms/Options";
import SudokuBoard from "../organisms/SudokuBoard";

const Game = () => {
    //default options
    //animations
  
    return (
     <div className="sudoku-game-area flex flex-row h-screen w-screen justify-between">
        <Options />
        <SudokuBoard />
        <DesktopNumPad />
     </div>
    );
  };
  
  export default Game;