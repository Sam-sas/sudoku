import { Link } from "react-router";
import Heading from "../atoms/Headings";
import heroImage from "../design/images/hero-image.jpg";

const Welcome = () => {
  return (
    <div
      className="no-scroll bg-cover bg-center set-height flex items-center justify-center flex-col m-4 md:m-auto motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md"
      id="welcome-page"
      style={{ backgroundImage: `url(${heroImage})` }}
    >

      <header className="flex justify-center">
        <Heading title="Let's Play Sudoku!" />
      </header>
      <div className="flex justify-betweeen">
        <Link
          to={{
            pathname: "/game",
          }}
          className="text-xl md:text-2xl m-4 hover-underline-animation left"
        >
          Start game
        </Link>
        <Link
          to={{
            pathname: "/rules",
          }}
          className="text-xl md:text-2xl m-4 hover-underline-animation left"
        >
          How do I play?
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
