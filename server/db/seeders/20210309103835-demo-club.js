'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Clubs', 
      [
        {
        name: 'Barca',
        admin_id:  1,
      },
        {
        name: 'Liverpool',
        admin_id:  1,
      },
        {
        name: 'Chelsea',
        admin_id:  2,
      },
        
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clubs', null, {});
  }
};
