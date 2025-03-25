import Button from "../atoms/Button";
import Heading from "../atoms/Headings";
import NumPad from "../components/NumPad";

const DesktopNumPad = () => {
  //default options
  //animations

  return (
    <div className="numpad-portion flex flex-col items-center mr-6">
      <Heading title="Numpad" />
      <NumPad />
      <div className="buttons flex flex-row">
        <Button btnName={"Erase"} />
        <Button btnName={"Pencil"} />
      </div>
    </div>
  );
};

export default DesktopNumPad;
