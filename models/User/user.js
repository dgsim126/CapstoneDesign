const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db'); // DB 연결 설정 불러오기

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userID: {
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
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // 기본값 false
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'User',
      tableName: 'user',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(models) {
    this.hasMany(models.Scrap, { foreignKey: 'userID', onDelete: 'CASCADE' });
  }
}

User.init(sequelize);

module.exports = User;