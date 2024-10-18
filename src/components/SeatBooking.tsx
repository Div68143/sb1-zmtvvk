import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, X } from 'lucide-react';

interface Seat {
  id: number;
  row: string;
  number: number;
  status: 'available' | 'booked' | 'selected';
}

const SeatBooking: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    // TODO: Fetch seats from the backend based on eventId
    const mockSeats: Seat[] = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      row: String.fromCharCode(65 + Math.floor(index / 10)),
      number: (index % 10) + 1,
      status: Math.random() > 0.2 ? 'available' : 'booked',
    }));
    setSeats(mockSeats);
  }, [eventId]);

  const toggleSeatSelection = (seatId: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId && seat.status === 'available'
          ? { ...seat, status: seat.status === 'selected' ? 'available' : 'selected' }
          : seat
      )
    );
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  const autoSelectSeats = () => {
    const availableSeats = seats.filter((seat) => seat.status === 'available');
    const autoSelected = availableSeats.slice(0, 2); // Select 2 best available seats
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        autoSelected.some((s) => s.id === seat.id)
          ? { ...seat, status: 'selected' }
          : seat
      )
    );
    setSelectedSeats(autoSelected.map((seat) => seat.id));
  };

  const confirmBooking = () => {
    // TODO: Implement booking confirmation logic
    alert(`Booking confirmed for seats: ${selectedSeats.join(', ')}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Select Your Seats</h1>
      <div className="mb-6">
        <button
          onClick={autoSelectSeats}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 mr-4"
        >
          Auto-Select Best Seats
        </button>
        <button
          onClick={confirmBooking}
          disabled={selectedSeats.length === 0}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Booking
        </button>
      </div>
      <div className="grid grid-cols-10 gap-2">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => toggleSeatSelection(seat.id)}
            disabled={seat.status === 'booked'}
            className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold ${
              seat.status === 'available'
                ? 'bg-gray-200 hover:bg-gray-300'
                : seat.status === 'selected'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white cursor-not-allowed'
            }`}
          >
            {seat.status === 'selected' ? (
              <Check size={16} />
            ) : seat.status === 'booked' ? (
              <X size={16} />
            ) : (
              `${seat.row}${seat.number}`
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatBooking;