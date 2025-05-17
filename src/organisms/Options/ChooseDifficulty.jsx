import Button from "../../atoms/Button";
import Heading from "../../atoms/Headings";
import Modal from "../../components/Modal";
import { motion } from "motion/react";
import { useSudoku } from "../../state-management/GlobalState";

const ChooseDifficulty = ({ open, onCloseFunction }) => {
    const { sudokuState, startNewGame } = useSudoku();
    const difficulties = ["easy", "medium", "hard", "expert"];

  return (
   <Modal open={open} onClose={onCloseFunction}>
        <Heading
            size="h4"
            fontSize="text-2xl sm:text-4xl"
            title={`Choose A Level`}
          />
           <Heading
            size="h5"
            fontSize="text-xl sm:text-2xl"
            title={`Current Level: ${sudokuState.difficulty}`}
          />
        <motion.div className={`settings-buttons flex flex-row flex-wrap justify-center`}>
          {difficulties.map((level, index) => (
            <Button
              key={index}
              btnName={level}
              onClickFunction={() => startNewGame(level)}
            />
          ))}
        </motion.div>
      </Modal>
  );
};

export default ChooseDifficulty;
