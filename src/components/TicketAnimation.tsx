import * as React from 'react';

interface TicketProps {
  isVisible: boolean;
  onClose: () => void;
  ticketData: {
    ticketNumber: string;
    driverName: string;
    carNumber: string;
    checkInTime: string;
    parkingSpot: string;
    isDisabled: boolean;
  };
}

export const TicketPopup: React.FC<TicketProps> = ({ isVisible, onClose, ticketData }) => {
  if (!isVisible || !ticketData) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="border-4 border-dashed border-primary p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-primary text-center mb-6">Parking Ticket</h2>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Ticket Number</div>
              <div className="text-xl font-semibold">{ticketData.ticketNumber}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Driver Name</div>
                <div className="font-medium">{ticketData.driverName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Vehicle Number</div>
                <div className="font-medium">{ticketData.carNumber}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Check-in Time</div>
                <div className="font-medium">{ticketData.checkInTime}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Parking Spot</div>
                <div className="font-medium">{ticketData.parkingSpot}</div>
              </div>
            </div>

            {ticketData.isDisabled && (
              <div className="bg-blue-100 text-blue-800 p-2 rounded text-center text-sm">
                Disabled Parking Spot
              </div>
            )}

            <div className="text-xs text-gray-500 text-center mt-6">
              Please keep this ticket safe for check-out
            </div>
          </div>
        </div>

        <button
          className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 active:bg-opacity-100"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}; 