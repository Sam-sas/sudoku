import Heading from "../atoms/Headings";

const Card = ({ imgSrc, imgAlt, headingTitle, children }) => {
   
  return (
      <div className="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md container rules-card border rounded-md shadow-xl md:w-96 m-4">
        <div className="border-b flex justify-center">
          <img className="" src={imgSrc} alt={imgAlt} />
        </div>
        <div className="p-6">
          <div className="pt-4">
            <Heading tag={"h3"} fontSize="text-2xl md:text-4xl" title={headingTitle} />
          </div>
          <div className="px-4 pb-2">
            {children}
          </div>
        </div>
      </div>
  );
};

export default Card;