import React from "react";
import { motion, AnimatePresence } from "motion/react";

const Button = ({
  btnName,
  onClickFunction,
  bgColor,
  textColor,
  borderColor,
  icon,
  isVisible = true,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } }} 
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeInOut" } }} 
      className={
        "button font-newspaper text-xl rounded-full p-4 m-2 border-4 flex items-center " +
        bgColor +
        " " +
        textColor +
        " " +
        borderColor
      }
      onClick={onClickFunction}
    >
      {icon ? icon : ""}
      <AnimatePresence>
      {isVisible && (
        <motion.span
          key={btnName} 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } }} 
          exit={{ opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeInOut" } }} 
        >{btnName}
        </motion.span>
      )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Button;
