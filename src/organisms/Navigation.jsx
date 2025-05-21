import { useState } from "react";
import { Link } from "react-router";
import Modal from "../components/Modal";
import Themes from "../components/Themes";

const Navigation = () => {
  const [openThemes, setOpenThemes] = useState(false);

  return (
    <>
    <Modal open={openThemes} onClose={() => setOpenThemes(false)}>
        <Themes />
    </Modal>
      <nav className="p-4 flex items-center justify-center sm:justify-start">
        <Link
          to={{
            pathname: "/",
          }}
          className="text-xl font-bold m-2 hover-underline-animation left"
        >
          Home
        </Link>
        <Link
          to={{
            pathname: "/game",
          }}
          className="text-xl font-bold m-2 hover-underline-animation left"
        >
          Play Game
        </Link>
        <Link
          to={{
            pathname: "/rules",
          }}
          className="text-xl font-bold m-2 hover-underline-animation left"
        >
          Rules
        </Link>
        <span
          className="cursor text-xl font-bold m-2 hover-underline-animation left"
          onClick={() => setOpenThemes(true)}
        >
          Themes
        </span>
      </nav>
    </>
  );
};

export default Navigation;
