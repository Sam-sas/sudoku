function Box({ boxKey, boxNumbers, onInputChange, prefilled }) {
  return (
    <div className="Box grid grid-cols-3 grid-rows-3 border-4 border-solid">
      {boxNumbers.map((num, index) => (
        <input
          key={index}
          type="text"
          value={num === 0 ? "" : num}
          onChange={(e) => onInputChange(boxKey, index, e.target.value)}
          className="w-16 h-16 text-center text-4xl border-2"
          readOnly={prefilled[boxKey][index] !== 0}
        />
      ))}
    </div>
  );
}

export default Box;
