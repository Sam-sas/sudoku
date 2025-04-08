import { Link } from "react-router";
import Heading from "../atoms/Headings";

const Welcome = () => {

  return (
    <div
      className="h-screen flex justify-center items-center flex-col motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md"
      id="welcome-page"
    >
      <header>
        <Heading title="Hello I am your welcome page" />
        <div className="text-4xl m-4">Subtext</div>
        <p className="text-2xl m-4">paragraph stuff here</p>
        <Link to={{
    pathname: "/game",
  }} className="text-2xl m-4">Start game</Link>
      </header>
      <p>stuff here

      </p>
    </div>
  );
};

export default Welcome;
