import React from "react";
import { motion } from "motion/react";

const Button = ({
  btnName,
  onClickFunction,
  bgColor,
  textColor,
  borderColor,
}) => {

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={
        "button font-newspaper text-2xl rounded-full p-4 m-2 border-4 pr-6 pl-6 " +
        bgColor +
        " " +
        textColor +
        " " +
        borderColor
      }
      onClick={onClickFunction}
    >
      {btnName}
    </motion.button>
  );
};

export default Button;
