import Heading from "../atoms/Headings";
import { HiTrophy } from "react-icons/hi2";
import { HiOutlineTrophy } from "react-icons/hi2";
import Button from "../atoms/Button";
import { useGameVersion, useSudoku } from "../state-management/GlobalState";
import { useEffect, useState } from "react";

const GameProgressChecker = ({ open, onClose, statusCheck }) => {
  // 0 = "didn't win";
  // 1 = "win";
  // 2 = "Progress is good";
  // 3 = "Wrong numbers/locations";

  const [status, setStatus] = useState(0);
  const { sudokuState, startNewGame } = useSudoku();
  const { gameVersionDispatch } = useGameVersion();

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
    });

    setStatus(progressBoolean ? 2 : 3);
  };

  const statusSelector = () => {
    const board = sudokuState.board;
    const solution = sudokuState.solution;
    let checkMatch = [];

    let hasEmptySpots = board.some((row) => {
      if (row.some((innerRow) => innerRow.includes(0))) {
        return true;
      }
    });

    if (hasEmptySpots) {
      console.log("has empty shots");
      setStatus(0);
      gameVersionDispatch({
        type: "SET_HAS_WON",
        payload: false,
      });
      return false;
    }

    board.map((row, index) => {
      let flatBoard = row.flat();
      let flatSolution = solution[index].flat();
      checkMatch.push(flatBoard.every((val, i) => val === flatSolution[i]));
    });

    if (checkMatch.filter((value) => value === true).length === 3) {
      setStatus(1);
      gameVersionDispatch({
        type: "SET_HAS_WON",
        payload: true,
      });
      return true;
    } else {
      setStatus(0);
      gameVersionDispatch({
        type: "SET_HAS_WON",
        payload: false,
      });
      return false;
    }
  };

  useEffect(() => {
    if (!open && !statusCheck) return;
    if (statusCheck === "Progress") {
      checkProgress();
    } else {
      statusSelector();
    }
  }, [open, statusCheck, sudokuState.board, sudokuState.solution]);

  const checkClose = () => {
    console.log("clicking outside");
    onClose();
  };

  const startNew = () => {
    startNewGame();
    onClose();
  };

  if (!open) return null;

  return (
    <div
      onClick={checkClose}
      className={`game-progress-checker w-screen fixed inset-0 flex justify-center transition-colors z-50 bg-black/20`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-5/6 md:w-1/8 max-w-lg mt-24 md:mt-16 overflow-auto
        motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md flex
        flex-col modal rounded-xl shadow-xl p-4 transition-all border-4`}
      >
        <div className="flex flex-col">
          <div className={`inner-show flex flex-col justify-between items-center ${status === 1 && "tada"}`}>
            {status === 0 && (
              <>
                <Heading size="h1" fontSize="text-4xl md:text-6xl" title="Not Quite..." />
                <HiOutlineTrophy />
                <Button
                  btnName={"Keep Solving!"}
                  onClickFunction={checkClose}
                  additonalClasses={"max-w-[75%] mb-4"}
                />
              </>
            )}

            {status === 1 && (
              <>
                <Heading size="h1" fontSize="text-4xl md:text-6xl" title="YOU'VE WON!" />
                <HiTrophy />
                <Button
                  btnName={"New Game?"}
                  onClickFunction={startNew}
                  additonalClasses={"max-w-[75%] mb-4"}
                />
              </>
            )}

             {status === 2 && (
              <>
                <Heading size="h1" fontSize="text-4xl md:text-6xl" title="Making Good Progress" />
                <HiTrophy />
                <Button
                  btnName={"Keep Solving!"}
                  onClickFunction={checkClose}
                  additonalClasses={"max-w-[75%] mb-4"}
                />
              </>
            )}

             {status === 3 && (
              <>
                <Heading size="h1" fontSize="text-4xl md:text-6xl" title="Wrong Answers Spotted" />
                <HiTrophy />
                <Button
                  btnName={"Keep Solving!"}
                  onClickFunction={checkClose}
                  additonalClasses={"max-w-[75%] mb-4"}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameProgressChecker;
