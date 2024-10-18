import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import QrReader from 'react-qr-reader';

function StudentDashboard() {
  const { currentUser } = useAuth();
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');

  const handleScan = async (data) => {
    if (data) {
      try {
        const { teacherId, token, timestamp } = JSON.parse(data);
        const response = await axios.post('/api/attendance/mark-attendance', {
          sessionId: teacherId,
          token,
          timestamp,
        });
        setScanResult('Attendance marked successfully');
      } catch (error) {
        setError('Failed to mark attendance');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error scanning QR code');
  };

  return (
    <div className="student-dashboard">
      <h2>Welcome, {currentUser.name}</h2>
      <div className="qr-scanner">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {scanResult && <p className="success">{scanResult}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default StudentDashboard;