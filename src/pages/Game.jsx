import DesktopNumPad from "../organisms/DesktopNumPad";
import Options from "../organisms/Options/Options";
import SudokuBoard from "../organisms/SudokuBoard";
import useWindowDimensions from "../utils/Hooks";

const Game = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div className="w-screen set-height flex flex-col-reverse justify-end sm:justify-start sm:items-start sm:flex-row sm:my-8">
      <div className="flex width-full  mx-4 sm:mx-6">
        <Options />
      </div>
      <div className="flex flex-col xl:flex-row justify-start lg:justify-center">
        <SudokuBoard />
        {width > 780 && <DesktopNumPad />}
      </div>
    </div>
  );
};

export default Game;
