import { motion } from 'framer-motion';
import { ParkingLevel } from '../types/parking';

interface ParkingDetailsProps {
  levels: ParkingLevel[];
}

export const ParkingDetails: React.FC<ParkingDetailsProps> = ({ levels }) => {
  const occupiedSlots = levels.flatMap(level =>
    level.slots.filter(slot => slot.isOccupied && slot.vehicle)
  );

  const calculateDuration = (checkInTime: string) => {
    const checkIn = new Date(checkInTime);
    const now = new Date();
    const hours = Math.ceil((now.getTime() - checkIn.getTime()) / (1000 * 60 * 60));
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };

  if (occupiedSlots.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-4 rounded-full bg-gray-700/50 mb-6"
        >
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.div>
        <h2 className="text-2xl text-white mb-4">No Vehicles Currently Parked</h2>
        <p className="text-gray-400">The parking lot is empty at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-green-500/10 rounded-xl p-6 border border-green-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-green-400 text-sm mb-2">Total Vehicles</div>
          <div className="text-3xl font-bold text-white">{occupiedSlots.length}</div>
        </motion.div>

        <motion.div
          className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-blue-400 text-sm mb-2">Standard Spots</div>
          <div className="text-3xl font-bold text-white">
            {occupiedSlots.filter(slot => !slot.isDisabled).length}
          </div>
        </motion.div>

        <motion.div
          className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-purple-400 text-sm mb-2">Disabled Access</div>
          <div className="text-3xl font-bold text-white">
            {occupiedSlots.filter(slot => slot.isDisabled).length}
          </div>
        </motion.div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-gray-400 font-medium">Slot</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Driver Name</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Car Number</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Check-in Time</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Duration</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Type</th>
            </tr>
          </thead>
          <tbody>
            {occupiedSlots.map(slot => (
              <motion.tr
                key={slot.id}
                className="border-b border-gray-700/50 hover:bg-white/5 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
              >
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700/50 text-white text-sm">
                    Level {slot.level} - {slot.number}
                  </span>
                </td>
                <td className="py-4 px-4 text-white font-medium">
                  {slot.vehicle?.driverName}
                </td>
                <td className="py-4 px-4 text-white">
                  {slot.vehicle?.carNumber}
                </td>
                <td className="py-4 px-4 text-gray-300">
                  {slot.vehicle?.checkInTime}
                </td>
                <td className="py-4 px-4">
                  <span className="text-yellow-400">
                    {calculateDuration(slot.vehicle?.checkInTime || '')}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    slot.isDisabled 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {slot.isDisabled ? 'Disabled Access' : 'Standard'}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 