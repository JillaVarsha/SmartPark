import { motion } from 'framer-motion';
import { ParkingSlot as ParkingSlotType } from '../types/parking';

interface ParkingSlotProps {
  slot: ParkingSlotType;
  onClick: (slot: ParkingSlotType) => void;
}

export const ParkingSlot = ({ slot, onClick }: ParkingSlotProps) => {
  const getSlotColor = () => {
    if (slot.isDisabled) {
      return slot.isOccupied ? 'bg-danger-dark' : 'bg-accent';
    }
    return slot.isOccupied ? 'bg-danger' : 'bg-success';
  };

  const getTooltipText = () => {
    const status = slot.isOccupied ? 'Occupied' : 'Available';
    const type = slot.isDisabled ? 'Disabled Access' : 'Standard';
    return `Slot ${slot.number} (Level ${slot.level}) - ${type} - ${status}`;
  };

  return (
    <div className="relative group">
      <motion.div
        className={`w-16 h-16 rounded-lg ${getSlotColor()} cursor-pointer flex items-center justify-center text-white font-bold transition-colors duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick(slot)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        layout // Add layout animation for smooth color transitions
      >
        {slot.number}
      </motion.div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
        {getTooltipText()}
      </div>
    </div>
  );
}; 