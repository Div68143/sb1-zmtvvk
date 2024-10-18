import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Info } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
}

const EventList: React.FC = () => {
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="mr-2" size={18} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Clock className="mr-2" size={18} />
                <span>{event.time}</span>
              </div>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <Link
                to={`/book/${event.id}`}
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                Book Seats
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;