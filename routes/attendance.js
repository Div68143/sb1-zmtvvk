const express = require('express');
const { Session, Attendance, User } = require('../models');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/start-session', authenticateJWT, async (req, res) => {
  try {
    const { className } = req.body;
    const teacherId = req.user.id;
    const session = await Session.create({ teacherId, startTime: new Date(), className });
    res.status(201).json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ message: 'Error starting session', error: error.message });
  }
});

router.post('/end-session', authenticateJWT, async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    session.endTime = new Date();
    await session.save();
    res.json({ message: 'Session ended successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error ending session', error: error.message });
  }
});

router.post('/mark-attendance', authenticateJWT, async (req, res) => {
  try {
    const { sessionId, token } = req.body;
    const studentId = req.user.id;
    // TODO: Validate token
    const attendance = await Attendance.create({ sessionId, studentId, timestamp: new Date() });
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking attendance', error: error.message });
  }
});

router.get('/session-attendance/:sessionId', authenticateJWT, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const attendances = await Attendance.findAll({
      where: { sessionId },
      include: [{ model: User, as: 'student', attributes: ['id', 'name', 'email'] }],
    });
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
});

module.exports = router;