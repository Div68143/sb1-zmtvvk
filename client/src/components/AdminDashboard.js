import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function AdminDashboard() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchSessions();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get('/api/admin/sessions');
      setSessions(response.data);
    } catch (error) {
      console.error('Failed to fetch sessions', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome, {currentUser.name}</h2>
      <div className="user-management">
        <h3>User Management</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="session-management">
        <h3>Session Management</h3>
        <table>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Teacher</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td>{session.className}</td>
                <td>{session.teacher.name}</td>
                <td>{new Date(session.startTime).toLocaleString()}</td>
                <td>{session.endTime ? new Date(session.endTime).toLocaleString() : 'Ongoing'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;