import { useState } from 'react';
import { motion } from 'framer-motion';
import { ParkingLevel, ParkingSlot } from '../types/parking';
import { ParkingLevel as ParkingLevelComponent } from './ParkingLevel';
import { CheckInForm } from './CheckInForm';
import { CheckOutForm } from './CheckOutForm';
import { SlotDetails } from './SlotDetails';
import { TicketPopup } from './TicketAnimation';
import { ParkingDetails } from './ParkingDetails';
import { BackgroundPattern } from './BackgroundPattern';

interface DashboardProps {
  initialMode: 'checkin' | 'checkout' | 'availability' | 'details';
  levels: ParkingLevel[];
  setLevels: React.Dispatch<React.SetStateAction<ParkingLevel[]>>;
}

const HOURLY_RATE = 2; // $2 per hour

export const Dashboard = ({ initialMode, levels, setLevels }: DashboardProps) => {
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [showTicket, setShowTicket] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<any>(null);

  const calculateParkingFee = (checkInTime: string) => {
    const checkIn = new Date(checkInTime);
    const checkOut = new Date();
    const hours = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60));
    return Math.max(HOURLY_RATE, hours * HOURLY_RATE); // Minimum charge of $2
  };

  const handleCheckIn = ({ driverName, carNumber, needsDisabledSpot }: {
    driverName: string;
    carNumber: string;
    needsDisabledSpot: boolean;
  }) => {
    const availableSlots = levels.flatMap(level =>
      level.slots.filter(slot =>
        !slot.isOccupied &&
        (needsDisabledSpot ? slot.isDisabled : !slot.isDisabled)
      )
    );

    if (availableSlots.length === 0) {
      alert('No available parking slots!');
      return;
    }

    // Randomly select an available slot
    const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
    const ticketNumber = `TICKET-${Date.now()}`;
    const checkInTime = new Date().toLocaleString();

    setLevels(prevLevels =>
      prevLevels.map(level => ({
        ...level,
        slots: level.slots.map(slot =>
          slot.id === randomSlot.id
            ? {
                ...slot,
                isOccupied: true,
                vehicle: {
                  ticketNumber,
                  driverName,
                  carNumber,
                  needsDisabledSpot,
                  checkInTime,
                },
              }
            : slot
        ),
      }))
    );

    setCurrentTicket({
      ticketNumber,
      driverName,
      carNumber,
      checkInTime,
      parkingSpot: `Level ${randomSlot.level} - Spot ${randomSlot.number}`,
      isDisabled: needsDisabledSpot
    });
    setShowTicket(true);
  };

  const handleCheckOut = ({ identifier }: { identifier: string }) => {
    let foundVehicle: any = null;
    let foundSlot: ParkingSlot | null = null;

    // First, try to find the vehicle by ticket number (exact match)
    levels.forEach(level => {
      level.slots.forEach(slot => {
        if (
          slot.isOccupied &&
          slot.vehicle &&
          slot.vehicle.ticketNumber === identifier
        ) {
          foundVehicle = slot.vehicle;
          foundSlot = slot;
        }
      });
    });

    // If not found by ticket number, try car number (case-insensitive)
    if (!foundVehicle) {
      levels.forEach(level => {
        level.slots.forEach(slot => {
          if (
            slot.isOccupied &&
            slot.vehicle &&
            slot.vehicle.carNumber.toLowerCase() === identifier.toLowerCase()
          ) {
            foundVehicle = slot.vehicle;
            foundSlot = slot;
          }
        });
      });
    }

    if (!foundVehicle || !foundSlot) {
      alert('Vehicle not found! Please check the ticket number or car number.');
      return;
    }

    const parkingFee = calculateParkingFee(foundVehicle.checkInTime);

    const confirmCheckout = window.confirm(
      `Parking Fee: $${parkingFee}\n\nDetails:\n` +
      `Driver: ${foundVehicle.driverName}\n` +
      `Vehicle: ${foundVehicle.carNumber}\n` +
      `Duration: ${Math.ceil((new Date().getTime() - new Date(foundVehicle.checkInTime).getTime()) / (1000 * 60 * 60))} hours\n\n` +
      'Confirm checkout?'
    );

    if (confirmCheckout) {
      setLevels(prevLevels =>
        prevLevels.map(level => ({
          ...level,
          slots: level.slots.map(slot =>
            slot.id === foundSlot?.id
              ? {
                  ...slot,
                  isOccupied: false,
                  vehicle: undefined,
                }
              : slot
          ),
        }))
      );
      alert('Vehicle checked out successfully!');
    }
  };

  const handleSlotClick = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
  };

  const renderContent = () => {
    const contentVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    return (
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 w-full max-w-7xl mx-auto px-4"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {initialMode === 'checkin' ? 'Check In Vehicle' :
           initialMode === 'checkout' ? 'Check Out Vehicle' :
           initialMode === 'details' ? 'Parking Details' :
           'Parking Availability'}
        </motion.h1>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8">
          {initialMode === 'checkin' && (
            <CheckInForm onSubmit={handleCheckIn} />
          )}
          {initialMode === 'checkout' && (
            <CheckOutForm onSubmit={handleCheckOut} />
          )}
          {initialMode === 'availability' && (
            <div className="space-y-6">
              {levels.map((level) => (
                <ParkingLevelComponent
                  key={level.level}
                  level={level}
                  onSlotClick={handleSlotClick}
                />
              ))}
            </div>
          )}
          {initialMode === 'details' && (
            <ParkingDetails levels={levels} />
          )}
        </div>

        <SlotDetails
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
        />

        <TicketPopup
          isVisible={showTicket}
          onClose={() => setShowTicket(false)}
          ticketData={currentTicket}
        />
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen pt-20 pb-10">
      <BackgroundPattern />
      {renderContent()}
    </div>
  );
}; 