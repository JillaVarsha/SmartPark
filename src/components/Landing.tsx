import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface LandingProps {
  onComplete: () => void;
}

export const Landing = ({ onComplete }: LandingProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.h1
          className="text-6xl font-bold text-white mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          SmartPark
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Seamless Parking Starts Here
        </motion.p>
      </div>
    </motion.div>
  );
}; 