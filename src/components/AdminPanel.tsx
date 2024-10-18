import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
}

const AdminPanel: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // TODO: Fetch events from the backend
    const mockEvents: Event[] = [
      {
        id: 1,
        name: 'Annual Cultural Fest',
        date: '2024-05-15',
        time: '18:00',
        description: 'Join us for a night of music, dance, and drama!',
      },
      {
        id: 2,
        name: 'Tech Symposium',
        date: '2024-06-10',
        time: '09:00',
        description: 'Explore the latest trends in technology and innovation.',
      },
    ];
    setEvents(mockEvents);
  }, []);

  const handleAddEvent = () => {
    // TODO: Implement add event logic
    console.log('Add event');
  };

  const handleEditEvent = (eventId: number) => {
    // TODO: Implement edit event logic
    console.log('Edit event', eventId);
  };

  const handleDeleteEvent = (eventId: number) => {
    // TODO: Implement delete event logic
    console.log('Delete event', eventId);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <button
        onClick={handleAddEvent}
        className="mb-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 flex items-center"
      >
        <PlusCircle className="mr-2" size={18} />
        Add New Event
      </button>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Time</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b">
              <td className="py-2 px-4">{event.name}</td>
              <td className="py-2 px-4">{event.date}</td>
              <td className="py-2 px-4">{event.time}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEditEvent(event.id)}
                  className="mr-2 text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;