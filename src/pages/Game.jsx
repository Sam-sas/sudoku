import DesktopNumPad from "../organisms/DesktopNumPad";
import MobileOptions from "../organisms/Options/MobileOptions";
import Options from "../organisms/Options/Options";
import SudokuBoard from "../organisms/SudokuBoard";
import useWindowDimensions from "../utils/Hooks";

const Game = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div className="flex sm:flex-col-reverse md:flex-row h-screen w-screen my-8">
      {width > 780 ? <Options /> : <MobileOptions />}
      <div className="flex flex-col xl:flex-row justify-start lg:justify-center">
        <SudokuBoard />
        {width > 780 && <DesktopNumPad />}
      </div>
    </div>
  );
};

export default Game;
