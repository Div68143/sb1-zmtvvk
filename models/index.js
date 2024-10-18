const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const SessionModel = require('./session');
const AttendanceModel = require('./attendance');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const User = UserModel(sequelize, Sequelize);
const Session = SessionModel(sequelize, Sequelize);
const Attendance = AttendanceModel(sequelize, Sequelize);

User.hasMany(Session, { foreignKey: 'teacherId' });
Session.belongsTo(User, { as: 'teacher', foreignKey: 'teacherId' });

Session.hasMany(Attendance);
Attendance.belongsTo(Session);

User.hasMany(Attendance, { foreignKey: 'studentId' });
Attendance.belongsTo(User, { as: 'student', foreignKey: 'studentId' });

module.exports = {
  sequelize,
  User,
  Session,
  Attendance,
};