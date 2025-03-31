import Button from "../atoms/Button";
import Heading from "../atoms/Headings";
import NumPad from "../components/NumPad";
import { usePencil, useSudoku } from "../state-management/GlobalState";

const DesktopNumPad = () => {
  const { sudokuState, sudokuDispatch } = useSudoku();
  const {pencilState, pencilDispatch } = usePencil();

  const showPencilMarkings = () => {
    pencilDispatch({ type: 'SET_USE_PENCIL', payload: !pencilState.usePencil });
  }

  const undoMarkings = () => {
    pencilDispatch({ type: 'SET_UNDO_MARKINGS', payload: !pencilState.undoAllMarkings });
  }

  const undoLastNumber = () => {
    if (
      sudokuState.selectedCell.outerBoxLocation && (sudokuState.selectedCell.inputIndex || sudokuState.selectedCell.inputIndex === 0)
    ) {
      const row = sudokuState.selectedCell.outerBoxLocation.row;
      const column = sudokuState.selectedCell.outerBoxLocation.column;
      const inputIndex = sudokuState.selectedCell.inputIndex;
      sudokuDispatch({
        type: "UPDATE_CELL",
        payload: {
          row,
          column,
          inputIndex,
          value: 0,
        },
      });
    }
  }

  return (
    <div className="numpad-portion flex flex-col items-center m-6">
      <Heading title="Numpad" />
      <NumPad />
      <div className="buttons flex flex-row">
        <Button btnName={"Undo Last"} onClickFunction={undoLastNumber} />
        <Button btnName={"Undo All Pencil Markings"} onClickFunction={undoMarkings} />
        <Button btnName={"Pencil"} onClickFunction={showPencilMarkings} />
      </div>
    </div>
  );
};

export default DesktopNumPad;
