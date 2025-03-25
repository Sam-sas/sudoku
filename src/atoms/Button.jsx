import React from "react";

const Button = ({btnName, onClickFunction, btnColor}) => {
    //default options
    //animations

  return (
    <button className={"rounded-full p-4 m-4 " + btnColor} onClick={onClickFunction}>
    {btnName}
  </button>
  );
};

export default Button;
