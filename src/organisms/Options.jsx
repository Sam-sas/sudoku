import { useState } from "react";
import Button from "../atoms/Button";
import Heading from "../atoms/Headings";
import { useSudoku } from "../state-management/GlobalState";
import SettingsModal from "../components/SettingsModal";

const Options = () => {
  const { sudokuState, sudokuDispatch, startNewGame } = useSudoku();
  const [toggleDifficultyVisibility, setToggleDifficultyVisibility] =
    useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [isGoingWell, setIsGoingWell] = useState(true);
  const difficulties = ["easy", "medium", "hard", "expert"];

  const toggleButton = () => {
    setToggleDifficultyVisibility(!toggleDifficultyVisibility);
  };

  const checkProgress = () => {
    let progressBoolean = true;
    sudokuState.board.forEach((box, boxIndex) => {
      box.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {
          if (
            value !== 0 &&
            value !== sudokuState.solution[boxIndex][rowIndex][columnIndex]
          ) {
            progressBoolean = false;
          }
        });
      });
      setIsGoingWell(progressBoolean);
    });
  };

  const restartBoard = () => {
    sudokuDispatch({ type: "SET_PUZZLE", payload: sudokuState.prefilled });
  };

  return (
    <div className="options ml-6 text-center">
      <Heading size="h2" title="Options" />
      <div className="buttons flex flex-col">
        <Button
          btnName={"Random New Game"}
          onClickFunction={() => startNewGame("")}
        />
        <Button btnName={"Choose Difficulty"} onClickFunction={toggleButton} />
        <Button btnName={"Check Progress"} onClickFunction={checkProgress} />
        <Button btnName={"Restart"} onClickFunction={restartBoard} />
        <Button
          btnName={"Settings"}
          onClickFunction={() => setOpenSettings(true)}
        />
      </div>
      <div
        className={`buttons flex flex-row ${
          toggleDifficultyVisibility ? "visible" : "invisible"
        }`}
      >
        {difficulties.map((level, index) => (
          <Button
            key={index}
            btnName={level}
            onClickFunction={() => startNewGame(level)}
          />
        ))}
      </div>

      <SettingsModal open={openSettings} onClose={() => setOpenSettings(false)}>
        Hello I am modal
      </SettingsModal>
    </div>
  );
};

export default Options;
