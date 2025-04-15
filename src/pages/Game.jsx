import DesktopNumPad from "../organisms/DesktopNumPad";
import Options from "../organisms/Options/Options";
import SudokuBoard from "../organisms/SudokuBoard";
import useWindowDimensions from "../utils/Hooks";

const Game = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div className="container flex flex-row h-screen w-screen my-8">
      <Options />
      <div className="flex flex-row justify-center">
        <SudokuBoard />
        <DesktopNumPad />
      </div>
    </div>
  );
};

export default Game;
