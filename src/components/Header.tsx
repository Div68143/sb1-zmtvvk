import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Calendar, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Calendar className="mr-2" />
          College Auditorium Booking
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user.name}</span>
              {user.isAdmin && (
                <Link to="/admin" className="mr-4 hover:text-blue-200">
                  Admin Panel
                </Link>
              )}
              <button
                onClick={logout}
                className="flex items-center hover:text-blue-200"
              >
                <LogOut className="mr-1" size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="mr-4 hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;