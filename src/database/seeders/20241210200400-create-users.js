'use strict';

const { faker } = require('@faker-js/faker'); // Importando o Faker

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('Users', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
      name: faker.person.fullName(),
      email: 'adm@email.com',
      password: '$2b$10$iIcEuEG7D1399BjzlamVnuJ3jEZlyngnAPb/Y.ohmTDXiCTv1hpXu',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Users', null, {});
     */
  }
};
