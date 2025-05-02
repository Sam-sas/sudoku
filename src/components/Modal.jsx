import Button from "../atoms/Button";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={` fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col modal rounded-xl shadow p-4 transition-all border-4 shadow-lg/70 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <Button
          icon={<IoCloseOutline />}
          onClickFunction={onClose}
          additonalClasses={"close-modal"}
        />
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
