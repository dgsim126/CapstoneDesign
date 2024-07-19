const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Users = db.sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true // 기본키
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // 중복 허용 X
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM,
    values: ['남자', '여자'],
    allowNull: false
  },
  job: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: false
});

// 동기화
// Users.sync({ force: true })
//   .then(() => {
//     console.log('Users table synchronized with force: true');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing Users table:', error);
//   });

module.exports = Users;