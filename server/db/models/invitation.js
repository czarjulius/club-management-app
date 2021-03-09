'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    static associate(models) {
      // define association here
      Invitation.belongsTo(models.User, {
        foreignKey: 'invitee_email',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      Invitation.belongsTo(models.Club, {
        foreignKey: 'club_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    }
  };
  Invitation.init({
    sender_email: DataTypes.STRING,
    invitee_email: DataTypes.STRING,
    club_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invitation',
  });
  return Invitation;
};