import Button from "../../atoms/Button";
import { useEffect, useState } from "react";
import { useGameVersion, useSudoku } from "../../state-management/GlobalState";
import { IoOptionsOutline } from "react-icons/io5";
import { MdFiberNew } from "react-icons/md";
import { GiDiamondHard } from "react-icons/gi";
import { TbProgressCheck } from "react-icons/tb";
import { MdRestartAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCarambola } from "react-icons/tb";
import { motion } from "motion/react";
import useWindowDimensions from "../../utils/Hooks";
import Settings from "./Settings";
import ChooseDifficulty from "./ChooseDifficulty";

const Options = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  const [openDifficulties, setOpenDifficulties] = useState(false);
  const [isGoingWell, setIsGoingWell] = useState(true);
  const { width } = useWindowDimensions();
  const { sudokuState, sudokuDispatch, startNewGame } = useSudoku();
  const { gameVersionState, gameVersionDispatch } = useGameVersion();

  useEffect(() => {
    if (width && width < 640) {
      setIsSideBarOpen(false);
    }
  }, [width, setIsSideBarOpen]);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSidebarOpen);
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

  const winConditionMet = () => {
    const board = sudokuState.board;
    const solution = sudokuState.solution;
    let checkMatch = [];

    let checkForEmpty = board.some((row) => {
      if (row.some((innerRow) => innerRow.includes(0))) {
        return true;
      }
    });

    if (checkForEmpty) {
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
      gameVersionDispatch({
        type: "SET_HAS_WON",
        payload: true,
      });
      return true;
    } else {
      gameVersionDispatch({
        type: "SET_HAS_WON",
        payload: false,
      });
      return false;
    }
  };

  return (
    <>
      {/* Difficulties modal */}
      <ChooseDifficulty
        open={openDifficulties}
        onCloseFunction={() => setOpenDifficulties(false)}
      />

      {/* Settings modal */}
      <Settings
        open={openSettings}
        onCloseFunction={() => setOpenSettings(false)}
      />
      <motion.div
        className={`container sm:max-w-[425px]  flex flex-row flex-wrap options mr-4 sm:m-px md:ml-6 md:mr-6 ${
          isSidebarOpen && "sm:pr-6"
        } text-center ${!isSidebarOpen && "motion-preset-rebound-left"} ${
          isSidebarOpen ? "open" : "closed"
        }`}
        initial={width > 640 ? "open" : "closed"}
      >
        <motion.div
          className="options-title hidden sm:flex items-center flex-row"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <Button
              btnName={"Options"}
              onClickFunction={toggleSidebar}
              additonalClasses={"sidebar-title"}
              icon={<IoOptionsOutline />}
              isVisible={isSidebarOpen}
            />
          ) : (
            <span onClick={toggleSidebar}>
              <IoOptionsOutline />
            </span>
          )}
        </motion.div>
        <motion.div className="buttons w-screen sm:w-full flex flex-row justify-between sm:flex-col my-4">
          {isSidebarOpen ? (
            <Button
              btnName={"Random New Game"}
              onClickFunction={() => startNewGame("")}
              icon={<MdFiberNew />}
              isVisible={isSidebarOpen}
            />
          ) : (
            <span onClick={() => startNewGame("")}>
              <MdFiberNew />
            </span>
          )}
          {isSidebarOpen ? (
            <Button
              btnName={"Choose Difficulty"}
              onClickFunction={() => setOpenDifficulties(true)}
              icon={<GiDiamondHard />}
              isVisible={isSidebarOpen}
            />
          ) : (
            <span onClick={() => setOpenDifficulties(true)}>
              <GiDiamondHard />
            </span>
          )}
          {isSidebarOpen && gameVersionState.version === "manual" && (
            <Button
              btnName={"Check Progress"}
              onClickFunction={checkProgress}
              icon={<TbProgressCheck />}
              isVisible={isSidebarOpen && gameVersionState.version === "manual"}
            />
          )}
          {!isSidebarOpen && gameVersionState.version === "manual" && (
            <span onClick={checkProgress}>
              <TbProgressCheck />
            </span>
          )}

          {isSidebarOpen && gameVersionState.version === "manual" && (
            <Button
              btnName={"Did I Win?"}
              onClickFunction={winConditionMet}
              icon={<TbCarambola />}
              isVisible={isSidebarOpen && gameVersionState.version === "manual"}
            />
          )}
          {!isSidebarOpen && (
            <span onClick={winConditionMet}>
              <TbCarambola />
            </span>
          )}

          {isSidebarOpen ? (
            <Button
              btnName={"Restart"}
              onClickFunction={restartBoard}
              icon={<MdRestartAlt />}
              isVisible={isSidebarOpen}
            />
          ) : (
            <span onClick={restartBoard}>
              <MdRestartAlt />
            </span>
          )}
          {isSidebarOpen ? (
            <Button
              btnName={"Settings"}
              onClickFunction={() => setOpenSettings(true)}
              icon={<IoSettingsOutline />}
              isVisible={isSidebarOpen}
            />
          ) : (
            <span onClick={() => setOpenSettings(true)}>
              <IoSettingsOutline />
            </span>
          )}
        </motion.div>

        {/* {isGoingWell ? <p>going well</p> : <p>No booboo ouchies</p>}
      {gameVersionState.hasWon ? "yes you won" : "no you didn't win"} */}
      </motion.div>
    </>
  );
};

export default Options;
