import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface CheckOutFormProps {
  onSubmit: (data: { identifier: string }) => void;
}

export const CheckOutForm = ({ onSubmit }: CheckOutFormProps) => {
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ identifier });
    setIdentifier('');
  };

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Check Out</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="block text-gray-300 mb-2">
            Ticket Number or Car Number
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-accent focus:outline-none"
            required
            placeholder="Enter ticket number or car number"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-danger hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Check Out
        </button>
      </form>
    </motion.div>
  );
}; 