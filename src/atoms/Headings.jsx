const Heading = ({ size = "h1", title = "Heading", fontSize = "text-4xl md:text-6xl" }) => {
  const Tag = size;
  return (
    <Tag className={"capitalize text-center font-pencil m-2 sm:m-4 " + fontSize}>{title}</Tag>
  );
};

export default Heading;
