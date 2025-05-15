import { Link } from "react-router";
import Heading from "../atoms/Headings";

const Welcome = () => {
  return (
    <div
      className="h-screen flex justify-center items-center flex-col motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md"
      id="welcome-page"
    >
      <header>
        <Heading title="Let's Play Sudoku!" />
      </header>
      <div className="flex justify-betweeen">
        <Link
          to={{
            pathname: "/rules",
          }}
          className="text-2xl m-4 hover-underline-animation left"
        >
          How do I play?
        </Link>
        <Link
          to={{
            pathname: "/game",
          }}
          className="text-2xl m-4 hover-underline-animation left"
        >
          Start game
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
