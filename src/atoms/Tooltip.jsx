import { motion, AnimatePresence } from "motion/react";

const ToolTip = ({ tooltip, buttonHover }) => {
    return (
        <AnimatePresence>
        {tooltip && buttonHover && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.2 },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -10,
              transition: { duration: 0.15 },
            }}
            className="tooltiptext motion-preset-expand motion-duration-500 absolute font-newspaper text-l rounded-full p-4 m-2 border-4 flex items-center"
          >
            {tooltip}
          </motion.span>
        )}
      </AnimatePresence>
    );
}
export default ToolTip;
