import { motion } from "motion/react";

const RippleLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-blue-500"
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-blue-500"
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
};

export default RippleLoader;
