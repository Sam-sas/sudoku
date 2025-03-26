import Heading from "../atoms/Headings";
import DesktopNumPad from "../organisms/DesktopNumPad";
import Options from "../organisms/Options";
import SudokuBoard from "../organisms/SudokuBoard";
import useWindowDimensions from "../utils/Hooks";

const Game = () => {
   const { height, width } = useWindowDimensions();

   

  return (
    <div className="sudoku-game-area flex flex-row h-screen">
      <Options />
      <div className="sudoku-game-itself flex flex-row justify-center">
        <SudokuBoard />
        <DesktopNumPad />
      </div>
    </div>
  );
};

export default Game;
