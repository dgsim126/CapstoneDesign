const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const User = require('../User/user');
const Company = require('../Company/company');
const StudentSupportInfo = require('../ITInfo/StudentSupportInfo/studentSupportInfoModel');
const QualificationInfo = require('../ITInfo/QualificationInfo/qualificationInfoModel');
const RecruitmentNoticeInfo = require('../ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoModel');

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
                allowNull: true
            },
            studentSupportInfoKey: {
                type: DataTypes.INTEGER,
                references: {
                    model: StudentSupportInfo,
                    key: 'key'
                },
                allowNull: true // 필요에 따라 true 또는 false 설정
            },
            qualificationInfoKey: {
                type: DataTypes.INTEGER,
                references: {
                    model: QualificationInfo,
                    key: 'key'
                },
                allowNull: true
            },
            recruitmentNoticeInfoKey: {
                type: DataTypes.INTEGER,
                references: {
                    model: RecruitmentNoticeInfo,
                    key: 'key'
                },
                allowNull: true
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
                    fields: ['userID', 'companyID', 'studentSupportInfoKey', 'qualificationInfoKey', 'recruitmentNoticeInfoKey']
                }
            ]
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userID', onDelete: 'CASCADE' });
        this.belongsTo(models.Company, { foreignKey: 'companyID', onDelete: 'CASCADE' });
        this.belongsTo(models.StudentSupportInfo, { foreignKey: 'studentSupportInfoKey', onDelete: 'CASCADE' });
        this.belongsTo(models.QualificationInfo, { foreignKey: 'qualificationInfoKey', onDelete: 'CASCADE' });
        this.belongsTo(models.RecruitmentNoticeInfo, { foreignKey: 'recruitmentNoticeInfoKey', onDelete: 'CASCADE' });
    }
}

Scrap.init(sequelize);

module.exports = Scrap;