'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Invitation.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      Invitation.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'club',
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