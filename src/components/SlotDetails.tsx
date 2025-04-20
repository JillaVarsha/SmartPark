import * as React from 'react';
import { motion } from 'framer-motion';
import { ParkingSlot } from '../types/parking';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SlotDetailsProps {
  slot: ParkingSlot | null;
  onClose: () => void;
}

export const SlotDetails: React.FC<SlotDetailsProps> = ({ slot, onClose }) => {
  if (!slot) return null;

  const getStatusColor = () => {
    if (slot.isDisabled) {
      return slot.isOccupied ? 'text-danger-dark' : 'text-accent';
    }
    return slot.isOccupied ? 'text-danger' : 'text-success';
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">Slot Details</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400">Slot Number:</span>
              <span className="text-white ml-2">{slot.number}</span>
            </div>
            <div>
              <span className="text-gray-400">Level:</span>
              <span className="text-white ml-2">{slot.level}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400">Type:</span>
              <span className="text-white ml-2">
                {slot.isDisabled ? 'Disabled Access' : 'Standard'}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Status:</span>
              <span className={`ml-2 font-medium ${getStatusColor()}`}>
                {slot.isOccupied ? 'Occupied' : 'Available'}
              </span>
            </div>
          </div>

          {slot.isOccupied && slot.vehicle && (
            <motion.div 
              className="mt-6 pt-4 border-t border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">Ticket Number:</span>
                  <span className="text-white ml-2 block mt-1">{slot.vehicle.ticketNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400">Driver Name:</span>
                  <span className="text-white ml-2 block mt-1">{slot.vehicle.driverName}</span>
                </div>
                <div>
                  <span className="text-gray-400">Car Number:</span>
                  <span className="text-white ml-2 block mt-1">{slot.vehicle.carNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400">Check-in Time:</span>
                  <span className="text-white ml-2 block mt-1">{slot.vehicle.checkInTime}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}; 