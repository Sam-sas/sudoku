import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Button = ({
  btnName,
  onClickFunction,
  bgColor,
  textColor,
  borderColor,
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
        "button font-newspaper text-xl rounded-full p-4 m-2 border-4 flex items-center "
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
      <AnimatePresence>
        {tooltip && buttonHover && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.2 },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -10,
              transition: { duration: 0.15 },
            }}
            className="tooltiptext motion-preset-expand motion-duration-500 absolute font-newspaper text-l rounded-full p-4 m-2 border-4 flex items-center"
          >
            {tooltip}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Button;
