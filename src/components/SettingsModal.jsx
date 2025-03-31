import Button from "../atoms/Button";

const SettingsModal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={` fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <Button
          btnName={"close"}
          onClickFunction={onClose}
          bgColor={"bg-red-500"}
          textColor={"text-white-500"}
        />
        {children}
      </div>
    </div>
  );
};

export default SettingsModal;
