const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = {}
const sequelize = new Sequelize('sejongton', 'user', '1234', { // 일부로 하드코딩한 것이니 건드리지 말 것
  host: 'localhost',
  dialect: 'mariadb', // MariaDB 사용
  logging: true // 쿼리 로깅 비활성화
});

// db 객체에 각 모델 및 Sequelize 설정 추가
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
