import { useState } from "react";
import Button from "../atoms/Button";
import Heading from "../atoms/Headings";
import { useSudoku } from "../state-management/GlobalState";

const Options = () => {
    const { startNewGame } = useSudoku();
  const [toggleDifficultyVisibility, setToggleDifficultyVisibility] = useState(false);
  const difficulties = ["easy", "medium", "hard", "expert"];

  const toggleButton = () => {
    setToggleDifficultyVisibility(!toggleDifficultyVisibility);
  }
  const checkProgress = () => {
    console.log("checking progess")
  }
  const restartBoard = () => {
    console.log("resetting board")
  }
  const openSettings = () => {
    console.log("opening settings")
  }



  return (
    <div className="options ml-6 text-center">
      <Heading size="h2" title="Options" />
      <div className="buttons flex flex-col">
        <Button btnName={"Random New Game"} onClickFunction={() => startNewGame("")} />
        <Button btnName={"Choose Difficulty"} onClickFunction={toggleButton} />
        <Button btnName={"Check Progress"} onClickFunction={checkProgress} />
        <Button btnName={"Restart"} onClickFunction={restartBoard} />
        <Button btnName={"Settings"} onClickFunction={openSettings} />
      </div>
      <div className={`buttons flex flex-row ${toggleDifficultyVisibility ? "visible" : "invisible"}`}>
        {difficulties.map((level, index) => (
          <Button
            key={index}
            btnName={level}
            onClickFunction={() => startNewGame(level)}
          />
        ))}
      </div>
    </div>
  );
};

export default Options;
