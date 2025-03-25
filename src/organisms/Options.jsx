import { useState } from "react";
import Button from "../atoms/Button";
import Heading from "../atoms/Headings";

const Options = () => {
  const [toggleDifficultyVisibility, setToggleDifficultyVisibility] = useState(false);
  const difficulties = ["easy", "medium", "hard", "expert"];


  const toggleButton = () => {
    setToggleDifficultyVisibility(!toggleDifficultyVisibility);
  }

  return (
    <div className="options ml-6 text-center">
      <Heading size="h2" title="Options" />
      <div className="buttons flex flex-col">
        <Button btnName={"Random New Game"} />
        <Button btnName={"Choose Difficulty"} onClickFunction={toggleButton} />
        <Button btnName={"Check Progress"} />
        <Button btnName={"Restart"} />
        <Button btnName={"Hint"} />
        <Button btnName={"Settings"} />
      </div>
      <div className={`buttons flex flex-row ${toggleDifficultyVisibility ? "visible" : "invisible"}`}>
        {difficulties.map((level, index) => (
          <Button
            key={index}
            btnName={level}
          />
        ))}
      </div>
    </div>
  );
};

export default Options;
