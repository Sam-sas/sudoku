const Heading = ({ size = "h1", title = "Heading", fontSize = "text-6xl" }) => {
  //default options
  //animations
  const Tag = size;
  return (
    <Tag className={"font-pencil m-6 text-coriander-950 " + fontSize}>
      {title}
    </Tag>
  );
};

export default Heading;
