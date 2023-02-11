'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Clubs', 
      [
        {
        name: 'Barca'.toLowerCase(),
        admin_id:  1,
      },
        {
        name: 'Liverpool'.toLowerCase(),
        admin_id:  1,
      },
        {
        name: 'Chelsea'.toLowerCase(),
        admin_id:  2,
      },
        
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clubs', null, {});
  }
};
