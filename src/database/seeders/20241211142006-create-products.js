'use strict';

const { faker } = require('@faker-js/faker'); // Importando o Faker

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('Products', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    for (let index = 1; index <= 100; index++) {

      await queryInterface.bulkInsert('Products', [{
        name: faker.word.words(2),
        total_stock: faker.number.int({ min: 5, max: 50 }),
        price: faker.number.int({ min: 1, max: 1000 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Products', null, {});
     */
  }
};
