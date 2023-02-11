'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Users', 
      [
        {
        name: 'Julius Ngwu',
        password:  bcrypt.hashSync('j@1', 10),
        email: "admin@test.com"
      },
        {
        name: 'Sam Smith',
        password:  bcrypt.hashSync('sam', 10),
        email: "sam@test.com"
      },
        {
        name: 'John Doe',
        password:  bcrypt.hashSync('john', 10),
        email: "john@test.com"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
