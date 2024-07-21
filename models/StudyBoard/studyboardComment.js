// models/FreeboardComment.js
const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db'); // DB 연결 설정 불러오기
const Studyboard = require('./studyboard'); // Studyboard 모델 불러오기

class StudyboardComment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            commentKey: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            studyboardkey: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { // 외래키 관계 설정(일대다)
                    model: Studyboard,
                    key: 'key'
                }
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isSecret: { // isSecret 속성 추가
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'StudyboardComment',
            tableName: 'studyboardComment',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    // ----- 추가한 부분 ------
    static associate(models) {
        this.belongsTo(models.Studyboard, {
            foreignKey: 'studyboardkey',
            onDelete: 'CASCADE'
        });
    }
    // ----- 추가한 부분 끝 ------
}

StudyboardComment.init(sequelize);

module.exports = StudyboardComment;
