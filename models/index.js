// 모델 초기화 & 관계 설정 파일
const { sequelize } = require('../config/db');
const User = require('./User/user');
const Company = require('./Company/company');
const Scrap = require('./Scrap/scrap');

// 모델 초기화
User.init(sequelize);
Company.init(sequelize);
Scrap.init(sequelize);

// 관계 정의
User.associate = models => {
  User.hasMany(models.Scrap, { foreignKey: 'userID', onDelete: 'CASCADE' });
};

Company.associate = models => {
  Company.hasMany(models.Scrap, { foreignKey: 'companyID' });
};

Scrap.associate = models => {
  Scrap.belongsTo(models.User, { foreignKey: 'userID', onDelete: 'CASCADE' });
  Scrap.belongsTo(models.Company, { foreignKey: 'companyID', onDelete: 'CASCADE' });
};

// 관계 설정
User.associate({ User, Scrap });
Company.associate({ Company, Scrap });
Scrap.associate({ User, Company, Scrap });

module.exports = {
  sequelize,
  User,
  Company,
  Scrap
};