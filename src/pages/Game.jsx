import DesktopNumPad from "../organisms/DesktopNumPad";
import Options from "../organisms/Options/Options";
import SudokuBoard from "../organisms/SudokuBoard";
import useWindowDimensions from "../utils/Hooks";

const Game = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div className="w-screen set-height flex flex-col-reverse justify-end sm:justify-start sm:items-start sm:flex-row sm:my-8">
      <div className="flex width-full  ml-4 mr-4 sm:ml-6 sm:mr-px">
        <Options />
      </div>
      <div className="flex flex-col xl:flex-row justify-center items-center">
        <SudokuBoard />
        <DesktopNumPad />
      </div>
    </div>
  );
};

export default Game;
