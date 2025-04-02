const Heading = ({ size = "h1", title = "Heading", fontSize = "text-6xl" }) => {
  const Tag = size;
  return (
    <Tag className={"capitalize font-pencil m-4 " + fontSize}>{title}</Tag>
  );
};

export default Heading;
