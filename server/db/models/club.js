'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Club.belongsTo(models.User, {
        foreignKey: 'admin_id',
        as: 'admin',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })

      Club.hasMany(models.User_Club, {
        as: 'myClubs',
        foreignKey: 'club_id',
      });

      Club.hasMany(models.Invitation, {
        foreignKey: 'club_id',
        as: 'clubs',
      });
    }
  };
  Club.init({
    name: DataTypes.STRING,
    admin_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Club',
  });
  return Club;
};