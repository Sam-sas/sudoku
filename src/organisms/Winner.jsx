import Heading from "../atoms/Headings";

const Winner = () => {
  return (
    <div className="motion-preset-confetti motion-duration-1500 size-72 winState absolute inset-0 z-50 flex items-center justify-center bg-yellow-400 tada">
      <Heading size="h1" fontSize="text-6xl" title="YOU WIN" />
    </div>
  );
};

export default Winner;
