import React from "react";

const Button = ({
  btnName,
  onClickFunction,
  bgColor = "bg-coriander-200",
  textColor = "text-coriander-950",
  borderColor = "border-coriander-300",
}) => {
  //default options
  //animations

  return (
    <button
      className={
        "font-newspaper text-2xl rounded-full p-4 m-2 border-4 pr-6 pl-6 " +
        bgColor +
        " " +
        textColor +
        " " +
        borderColor
      }
      onClick={onClickFunction}
    >
      {btnName}
    </button>
  );
};

export default Button;
