// models/FreeboardComment.js
const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db'); // DB 연결 설정 불러오기
const Freeboard = require('./freeboard'); // Freeboard 모델 불러오기

class FreeboardComment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            commentKey: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            freeboardkey: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { // 외래키 관계 설정(일대다)
                    model: Freeboard,
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
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'FreeboardComment',
            tableName: 'freeboardComment',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(models) {
        this.belongsTo(models.Freeboard, {
            foreignKey: 'freeboardkey', // 해당 부분 freeboardkey로 바꿔야 하는지?
            onDelete: 'CASCADE'
        });
    }
}

FreeboardComment.init(sequelize);

module.exports = FreeboardComment;
