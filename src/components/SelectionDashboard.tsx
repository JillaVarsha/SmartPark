import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Dashboard } from './Dashboard';
import { ParkingLevel, ParkingSlot } from '../types/parking';
import { BackgroundPattern } from './BackgroundPattern';

type Mode = 'selection' | 'checkin' | 'checkout' | 'availability' | 'details';

export const SelectionDashboard = () => {
  const [mode, setMode] = useState<Mode>('selection');
  const [levels, setLevels] = useState<ParkingLevel[]>([]);

  useEffect(() => {
    // Initialize parking levels
    const initialLevels: ParkingLevel[] = Array.from({ length: 3 }, (_, levelIndex) => {
      const slots: ParkingSlot[] = Array.from({ length: 50 }, (_, slotIndex) => ({
        id: `${levelIndex + 1}-${slotIndex + 1}`,
        level: levelIndex + 1,
        number: slotIndex + 1,
        isDisabled: slotIndex < 10, // First 10 slots are for disabled parking
        isOccupied: false,
      }));
      return { level: levelIndex + 1, slots };
    });
    setLevels(initialLevels);
  }, []);

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 5px 10px rgba(0,0,0,0.2)"
    }
  };

  const handleBackToMenu = () => {
    setMode('selection');
  };

  if (mode !== 'selection') {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-primary to-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <BackgroundPattern />
        <motion.button
          className="absolute top-4 left-4 z-50 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-colors"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleBackToMenu}
        >
          ← Back to Menu
        </motion.button>
        <Dashboard 
          key={mode}
          initialMode={mode} 
          levels={levels}
          setLevels={setLevels}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-primary to-gray-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BackgroundPattern />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full space-y-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              SmartPark
            </h1>
            <p className="text-xl text-gray-300">
              Your Modern Parking Solution
            </p>
          </motion.div>

          <div className="grid gap-6">
            <motion.button
              className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setMode('checkin')}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">Check In</h2>
                  <p className="text-gray-400">Park your vehicle</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setMode('checkout')}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors">Check Out</h2>
                  <p className="text-gray-400">Exit parking</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setMode('availability')}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">View Availability</h2>
                  <p className="text-gray-400">Check empty spots</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setMode('details')}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">View All Details</h2>
                  <p className="text-gray-400">Current parking status</p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 