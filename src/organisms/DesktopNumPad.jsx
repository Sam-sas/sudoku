import Button from "../atoms/Button";
import Heading from "../atoms/Headings";
import NumPad from "../components/NumPad";
import { usePencil, useSudoku } from "../state-management/GlobalState";
import { TbPencilOff } from "react-icons/tb";
import { TbPencil } from "react-icons/tb";
import { TbPencilDown } from "react-icons/tb";
import { TbPencilCancel } from "react-icons/tb";
import useWindowDimensions from "../utils/Hooks";

const DesktopNumPad = () => {
  const { sudokuState, sudokuDispatch } = useSudoku();
  const { pencilState, pencilDispatch } = usePencil();
  const { width } = useWindowDimensions();

  const showPencilMarkings = () => {
    pencilDispatch({ type: "SET_USE_PENCIL", payload: !pencilState.usePencil });
  };

  const undoMarkings = () => {
    pencilDispatch({
      type: "SET_UNDO_MARKINGS",
      payload: !pencilState.undoAllMarkings,
    });
  };

  const undoLastNumber = () => {
    if (
      sudokuState.selectedCell.outerBoxLocation &&
      (sudokuState.selectedCell.inputIndex ||
        sudokuState.selectedCell.inputIndex === 0)
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
  };

  return (
    <div className="numpad-portion flex flex-col items-center mx-6 motion-preset-slide-left">
      { width > 1280 && <Heading title="Numpad" />}
      {width > 640 && <NumPad />}
      <div className="buttons flex flex-row pencil-markings mt-4 md:mt-2">
        <Button
          icon={<TbPencilDown />}
          onClickFunction={undoLastNumber}
          tooltip={"Undo last number"}
        />
        <Button
          icon={<TbPencilCancel />}
          onClickFunction={undoMarkings}
          tooltip={"Remove pencil markings"}
        />
        {pencilState.usePencil ? (
          <Button
            onClickFunction={showPencilMarkings}
            icon={<TbPencilOff />}
            tooltip={"Turn off pencil"}
          />
        ) : (
          <Button
            onClickFunction={showPencilMarkings}
            icon={<TbPencil />}
            tooltip={"Turn on pencil"}
          />
        )}
      </div>
    </div>
  );
};

export default DesktopNumPad;
