import Button from "../../atoms/Button";
import Modal from "../../components/Modal";
import { useState } from "react";
import { useGameVersion, useSudoku } from "../../state-management/GlobalState";
import { IoOptionsOutline } from "react-icons/io5";
import { MdFiberNew } from "react-icons/md";
import { GiDiamondHard } from "react-icons/gi";
import { TbProgressCheck } from "react-icons/tb";
import { MdRestartAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCarambola } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import useWindowDimensions from "../../utils/Hooks";
import Settings from "./Settings";

const Options = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  const [openDifficulties, setOpenDifficulties] = useState(false);
  const [isGoingWell, setIsGoingWell] = useState(true);
  const { width } = useWindowDimensions();

  const { sudokuState, sudokuDispatch, startNewGame } = useSudoku();
  const { gameVersionState, gameVersionDispatch } = useGameVersion();
  const difficulties = ["easy", "medium", "hard", "expert"];

  const variants = {
    openSmall: {
      width: "250px",
      transition: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
    },
    openMedium: {
      width: "300px",
      transition: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
    },
    openLarge: {
      width: "350px",
      transition: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
    },
    openXLarge: {
      width: "475px",
      transition: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
    },
    closed: {
      width: "100px",
      transition: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
    },
  };

  const titleVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { ease: "easeInOut", visualDuration: 1, bounce: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

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

  const getCurrentVariant = () => {
    if (!isSidebarOpen) {
      return "closed";
    } else if (width <= 800) {
      return "openSmall";
    } else if (width <= 1050) {
      return "openMedium";
    } else if (width <= 1200) {
      return "openLarge";
    } else {
      return "openXLarge";
    }
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
    <motion.div
      className={`container options ml-6  mr-4 md:mr-6 pr-6 text-center ${
        isSidebarOpen ? "open" : "closed"
      }`}
      initial="open"
      variants={variants}
      animate={getCurrentVariant}
    >
      <motion.div
        className="options-title flex items-center"
        onClick={toggleSidebar}
      >
        <IoOptionsOutline />
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.h2
              key="options-title"
              className="capitalize font-pencil m-4 md:m-2 max-sm:m-[25px] text-3xl sm:text-3xl lg:text-4xl"
              variants={titleVariants}
              initial="initial"
              animate={isSidebarOpen ? "animate" : "initial"}
              exit="exit"
            >
              Options
            </motion.h2>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div className="buttons flex flex-col my-4">
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

      {/* Difficulties modal */}
      <Modal open={openDifficulties} onClose={() => setOpenDifficulties(false)}>
        Difficulties modal here
        <motion.div className={`buttons flex flex-row`}>
          {difficulties.map((level, index) => (
            <Button
              key={index}
              btnName={level}
              onClickFunction={() => startNewGame(level)}
            />
          ))}
        </motion.div>
      </Modal>

      {/* Settings modal */}
      <Settings
        open={openSettings}
        onCloseFunction={() => setOpenSettings(false)}
      />

      {isGoingWell ? <p>going well</p> : <p>No booboo ouchies</p>}
      {gameVersionState.hasWon ? "yes you won" : "no you didn't win"}
    </motion.div>
  );
};

export default Options;
