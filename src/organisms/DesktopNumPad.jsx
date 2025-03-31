import Button from "../atoms/Button";
import Heading from "../atoms/Headings";
import NumPad from "../components/NumPad";
import { useSudoku } from "../state-management/GlobalState";

const DesktopNumPad = () => {
  const {state, dispatch } = useSudoku();
  //default options
  //animations

  const togglePencil = () => {
    dispatch({ type: 'SET_USE_PENCIL', payload: !state.usePencil });
  }

  return (
    <div className="numpad-portion flex flex-col items-center m-6">
      <Heading title="Numpad" />
      <NumPad />
      <div className="buttons flex flex-row">
        <Button btnName={"Erase"} />
        <Button btnName={"Pencil"} onClickFunction={togglePencil} />
      </div>
    </div>
  );
};

export default DesktopNumPad;
