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
import GameProgressChecker from "../GameProgressChecker";

const Options = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  const [openDifficulties, setOpenDifficulties] = useState(false);
  const [openGameStatus, setOpenGameStatus] = useState(false);
  const [statusCheck, setStatusCheck] = useState(null);
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

  const restartBoard = () => {
    sudokuDispatch({ type: "SET_PUZZLE", payload: sudokuState.prefilled });
  };

  const openGameStatusPopup = (status) => {
    setStatusCheck(status);
    setOpenGameStatus(true);
  }

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

      {/* game status checker */}
      <GameProgressChecker
        open={openGameStatus}
        onClose={() => {
          setOpenGameStatus(false);
        }}
        statusCheck={statusCheck}
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
              onClickFunction={() => openGameStatusPopup("Progress")}
              icon={<TbProgressCheck />}
              isVisible={isSidebarOpen && gameVersionState.version === "manual"}
            />
          )}
          {!isSidebarOpen && gameVersionState.version === "manual" && (
            <span onClick={() => openGameStatusPopup("Progress")}>
              <TbProgressCheck />
            </span>
          )}

          {isSidebarOpen && gameVersionState.version === "manual" && (
            <Button
              btnName={"Did I Win?"}
              onClickFunction={() => openGameStatusPopup("Win Status")}
              icon={<TbCarambola />}
              isVisible={isSidebarOpen && gameVersionState.version === "manual"}
            />
          )}
          {!isSidebarOpen && (
            <span onClick={() => openGameStatusPopup("Win Status")}>
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
