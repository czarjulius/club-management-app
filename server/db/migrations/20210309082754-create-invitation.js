'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_email: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: 'Users',
          key: 'email'
        }
      },
      invitee_email: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: 'Users',
          key: 'email'
        }
      },
      club_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Clubs',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invitations');
  }
};