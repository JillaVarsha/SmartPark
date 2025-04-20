import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface CheckInFormProps {
  onSubmit: (data: {
    driverName: string;
    carNumber: string;
    needsDisabledSpot: boolean;
  }) => void;
}

export const CheckInForm = ({ onSubmit }: CheckInFormProps) => {
  const [driverName, setDriverName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [needsDisabledSpot, setNeedsDisabledSpot] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      driverName,
      carNumber,
      needsDisabledSpot,
    });
    setDriverName('');
    setCarNumber('');
    setNeedsDisabledSpot(false);
  };

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Check In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="driverName" className="block text-gray-300 mb-2">
            Driver Name
          </label>
          <input
            type="text"
            id="driverName"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-accent focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="carNumber" className="block text-gray-300 mb-2">
            Car Number
          </label>
          <input
            type="text"
            id="carNumber"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-accent focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="needsDisabledSpot"
            checked={needsDisabledSpot}
            onChange={(e) => setNeedsDisabledSpot(e.target.checked)}
            className="w-4 h-4 text-accent border-gray-600 rounded focus:ring-accent bg-gray-700"
          />
          <label htmlFor="needsDisabledSpot" className="ml-2 text-gray-300">
            Needs Disabled Spot
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Check In
        </button>
      </form>
    </motion.div>
  );
}; 