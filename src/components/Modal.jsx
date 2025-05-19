import Button from "../atoms/Button";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ open, onClose, children }) => {

  const checkClose = () => {
    onClose();
  }

  return (
    <div
      onClick={checkClose}
      className={` w-screen fixed inset-0 flex justify-center transition-colors z-50 ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`h-full max-h-[600px] md:max-h-[800px]  w-5/6 md:w-1/8 max-w-lg mt-24 md:mt-16 overflow-auto motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md flex flex-col modal rounded-xl shadow-xl p-4 transition-all border-4 ${
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
