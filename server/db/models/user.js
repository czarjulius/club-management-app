'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Club, {
        foreignKey: 'admin_id',
        as: 'admins',
      });

      User.hasMany(models.User_Club, {
        as: 'users',
        foreignKey: 'user_id',
      });

      User.hasMany(models.Invitation, {
        foreignKey: 'invitee_email',
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};