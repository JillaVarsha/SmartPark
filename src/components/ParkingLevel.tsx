import { motion } from 'framer-motion';
import { ParkingSlot as ParkingSlotComponent } from './ParkingSlot';
import { ParkingLevel as ParkingLevelType, ParkingSlot as ParkingSlotType } from '../types/parking';

interface ParkingLevelProps {
  level: ParkingLevelType;
  onSlotClick: (slot: ParkingSlotType) => void;
}

export const ParkingLevel = ({ level, onSlotClick }: ParkingLevelProps) => {
  return (
    <motion.div
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Level {level.level}</h2>
      <div className="grid grid-cols-10 gap-4">
        {level.slots.map((slot) => (
          <ParkingSlotComponent
            key={slot.id}
            slot={slot}
            onClick={onSlotClick}
          />
        ))}
      </div>
    </motion.div>
  );
}; 