import Button from "../../atoms/Button";
import Heading from "../../atoms/Headings";
import Modal from "../../components/Modal";
import { TbManualGearbox } from "react-icons/tb";
import { TbAutomaticGearbox } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { LuLeafyGreen } from "react-icons/lu";
import { LuWaves } from "react-icons/lu";
import { TbSunHigh } from "react-icons/tb";


const Settings = ({ open, onCloseFunction }) => {
  return (
    <Modal open={open} onClose={onCloseFunction}>
      <div>
        <Heading size="h4" title="Settings" fontSize="text-4xl" />
        <div className="version-pick">
          <div>
            <Heading size="h5" title="Manual Mode: " fontSize="text-2xl" />
            <p>
              Manual mode means you will not have visual queues on your
              progress. You will be able to use the check progress button to see
              if you have any mistakes, and the ability to check if you've won.
              Otherwise it will be as if you are writing pen to paper.
            </p>
          </div>
          <div>
            <Heading size="h5" title="Automatic Mode: " fontSize="text-2xl" />
            <p>
              Automatic mode means you will have visual queues on your progress.
              While the Check Progress button and win state are gone, the game
              will automatically let you know if you've made a mistake or not,
              or if you've won.
            </p>
          </div>
          <div className="settings-buttons flex flex-row flex-wrap justify-center">
            <Button
              btnName={"Manual Mode"}
              icon={<TbManualGearbox />}
              additonalClasses={"my-4"}
            />
            <Button
              btnName={"Automatic Mode"}
              icon={<TbAutomaticGearbox />}
              additonalClasses={"my-4"}
            />
          </div>
        </div>
        <div className="theme-pick">
        <Heading size="h5" title="Themes" fontSize="text-2xl" />
          <div className="settings-buttons flex flex-row flex-wrap justify-center">
            <Button btnName={"Light"} icon={<HiOutlineLightBulb />} additonalClasses={"justify-start light"} />
            <Button btnName={"Dark"} icon={<MdOutlineDarkMode />} additonalClasses={"justify-start dark"} />
            <Button btnName={"Parchment"} icon={<HiOutlineNewspaper />} additonalClasses={"justify-start parchment"} />
            <Button btnName={"Coriander"} icon={<LuLeafyGreen />} additonalClasses={"justify-start coriander"} />
            <Button btnName={"Cyberwave"} icon={<LuWaves />} additonalClasses={"justify-start cyberwave"} />
            <Button btnName={"Full Sun"} icon={<TbSunHigh />} additonalClasses={"justify-start full-sun"} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Settings;
