import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ToolTip from "./Tooltip";

const Button = ({
  btnName,
  onClickFunction,
  additonalClasses,
  icon,
  isVisible = true,
  tooltip,
}) => {
  const [buttonHover, setButtonHover] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setButtonHover(true)}
      onMouseLeave={() => setButtonHover(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      exit={{
        opacity: 0,
        x: -20,
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
      className={
       `button font-newspaper text-xl lg:text-2xl rounded-full p-4 m-2 border-4 flex items-center ${additonalClasses}`
      }
      onClick={onClickFunction}
    >
      {icon ? icon : ""}
      <AnimatePresence>
        {isVisible && (
          <motion.span
            key={btnName}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              x: -20,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
          >
            {btnName}
          </motion.span>
        )}
      </AnimatePresence>
      {tooltip && <ToolTip tooltip={tooltip} buttonHover={buttonHover} />}
    </motion.button>
  );
};

export default Button;
