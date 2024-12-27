'use strict';

const { faker } = require('@faker-js/faker'); // Importando o Faker

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    for (let i = 0; i < 1000; i++) {
      await queryInterface.bulkInsert('Customers', [
        {
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase().replace('+',''),
          phone: faker.phone.number({ style: 'international' }),
          status: faker.helpers.arrayElement([true, false]),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
    }

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */

    await queryInterface.bulkDelete('Customers', null, {});
  }
};
