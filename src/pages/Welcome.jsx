import Heading from "../atoms/Headings";

const Welcome = () => {
  //default options
  //animations

  return (
    <div
      className="h-screen flex justify-center items-center flex-col"
      id="welcome-page"
    >
      <header>
        <Heading title="Hello I am your welcome page" />
        <div className="text-4xl m-4">Subtext</div>
        <p className="text-2xl m-4">paragraph stuff here</p>
        <p className="text-2xl m-4">Start game</p>
      </header>
      <p>stuff here

      </p>
    </div>
  );
};

export default Welcome;
