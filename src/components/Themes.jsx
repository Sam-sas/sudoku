import Button from "../atoms/Button";
import Heading from "../atoms/Headings";
import { useTheme } from "../utils/Hooks";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { LuLeafyGreen } from "react-icons/lu";
import { LuWaves } from "react-icons/lu";
import { TbSunHigh } from "react-icons/tb";

const Themes = () => {
  const [theme, setTheme] = useTheme();
  const themeOptions = [
    { theme: "light", icon: <HiOutlineLightBulb /> },
    { theme: "dark", icon: <MdOutlineDarkMode /> },
    { theme: "parchment", icon: <HiOutlineNewspaper /> },
    { theme: "coriander", icon: <LuLeafyGreen /> },
    { theme: "cyberwave", icon: <LuWaves /> },
    { theme: "full-sun", icon: <TbSunHigh /> },
  ];

  return (
    <>
      <div className="theme-pick">
        <Heading size="h5" title="Themes" fontSize="text-2xl" />
        <div className="settings-buttons flex  flex-col sm:flex-row flex-wrap justify-center">
          {themeOptions.map((theme, index) => (
            <Button
              key={index}
              btnName={theme.theme}
              icon={theme.icon}
              additonalClasses={`justify-start ${theme.theme}`}
              onClickFunction={() => setTheme(theme.theme)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Themes;
