import Button from "../../atoms/Button";
import Heading from "../../atoms/Headings";
import Modal from "../../components/Modal";
import { TbManualGearbox } from "react-icons/tb";
import { TbAutomaticGearbox } from "react-icons/tb";
import { useGameVersion } from "../../state-management/GlobalState";
import Themes from "../../components/Themes";

const Settings = ({ open, onCloseFunction }) => {
  const { gameVersionState, gameVersionDispatch } = useGameVersion();

  const gameVersionSwitch = (version) => {
    gameVersionDispatch({ type: "SET_GAME_VERSION", payload: version });
  };

  return (
    <Modal open={open} onClose={onCloseFunction}>
      <div>
        <Heading size="h4" title="Settings" fontSize="text-2xl sm:text-4xl" />
        <div className="version-pick">
          {/* <Heading
            size="h5"
            fontSize="text-xl sm:text-2xl"
            title={`Current Play: ${gameVersionState.version}`}
          />
          <div>
            <Heading size="h5" title="Manual Mode: " fontSize="text-xl sm:text-2xl" />
            <p>
              Manual mode means you will not have visual queues on your
              progress. You will be able to use the check progress button to see
              if you have any mistakes, and the ability to check if you've won.
              Otherwise it will be as if you are writing pen to paper.
            </p>
          </div>
          <div>
            <Heading size="h5" title="Automatic Mode: " fontSize="text-xl sm:text-2xl" />
            <p>
              Automatic mode means you will have visual queues on your progress.
              While the Check Progress button and win state are gone, the game
              will automatically let you know if you've made a mistake or not,
              or if you've won.
            </p>
          </div> */}
          {/* <div className="settings-buttons flex flex-row flex-wrap justify-center">
            <Button
              btnName={"Manual Mode"}
              icon={<TbManualGearbox />}
              additonalClasses={"my-4"}
              onClickFunction={() => gameVersionSwitch("manual")}
            />
            <Button
              btnName={"Automatic Mode"}
              icon={<TbAutomaticGearbox />}
              additonalClasses={"my-4"}
              onClickFunction={() => gameVersionSwitch("automatic")}
            />
          </div> */}
        </div>
        <Themes />
      </div>
    </Modal>
  );
};

export default Settings;
