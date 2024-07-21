const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const User = require('../User/user');
const Company = require('../Company/company');

class Scrap extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            key: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userID: {
                type: DataTypes.INTEGER,
                references: {
                    model: User,
                    key: 'userID'
                },
                allowNull: false
            },
            companyID: {
                type: DataTypes.INTEGER,
                references: {
                    model: Company,
                    key: 'companyID'
                },
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Scrap',
            tableName: 'scrap',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            indexes: [
                {
                    unique: true,
                    fields: ['userID', 'companyID']
                }
            ]
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userID', onDelete: 'CASCADE' });
        this.belongsTo(models.Company, { foreignKey: 'companyID', onDelete: 'CASCADE' });
    }
}

Scrap.init(sequelize);

module.exports = Scrap;