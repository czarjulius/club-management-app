'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Club extends Model {
    static associate(models) {
      // define association here
      User_Club.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      User_Club.belongsTo(models.Club, {
        foreignKey: 'club_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    }
  };
  User_Club.init({
    user_id: DataTypes.INTEGER,
    club_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Club',
  });
  return User_Club;
};