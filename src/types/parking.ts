export interface ParkingSlot {
  id: string;
  level: number;
  number: number;
  isDisabled: boolean;
  isOccupied: boolean;
  vehicle?: Vehicle;
}

export interface Vehicle {
  ticketNumber: string;
  driverName: string;
  carNumber: string;
  needsDisabledSpot: boolean;
  checkInTime: string;
}

export interface ParkingLevel {
  level: number;
  slots: ParkingSlot[];
} 