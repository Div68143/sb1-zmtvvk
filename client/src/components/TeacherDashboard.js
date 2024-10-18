import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';
import QRCode from 'qrcode.react';

function TeacherDashboard() {
  const { currentUser } = useAuth();
  const [className, setClassName] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [qrCode, setQRCode] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);

    if (sessionId) {
      socket.emit('startSession', currentUser.id);

      socket.on('newQRCode', (data) => {
        setQRCode(data.qrCodeImage);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [sessionId, currentUser.id]);

  const startSession = async () => {
    try {
      const response = await axios.post('/api/attendance/start-session', { className });
      setSessionId(response.data.sessionId);
    } catch (error) {
      console.error('Failed to start session', error);
    }
  };

  const endSession = async () => {
    try {
      await axios.post('/api/attendance/end-session', { sessionId });
      setSessionId(null);
      setQRCode('');
    } catch (error) {
      console.error('Failed to end session', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`/api/attendance/session-attendance/${sessionId}`);
      setAttendanceList(response.data);
    } catch (error) {
      console.error('Failed to fetch attendance', error);
    }
  };

  return (
    <div className="teacher-dashboard">
      <h2>Welcome, {currentUser.name}</h2>
      {!sessionId ? (
        <div>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Enter class name"
          />
          <button onClick={startSession}>Start Session</button>
        </div>
      ) : (
        <div>
          <h3>Session in progress: {className}</h3>
          <div className="qr-code-container">
            {qrCode && <QRCode value={qrCode} size={256} />}
          </div>
          <button onClick={endSession}>End Session</button>
          <button onClick={fetchAttendance}>Refresh Attendance</button>
          <div className="attendance-list">
            <h4>Attendance:</h4>
            <ul>
              {attendanceList.map((attendance) => (
                <li key={attendance.id}>
                  {attendance.student.name} - {new Date(attendance.timestamp).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;