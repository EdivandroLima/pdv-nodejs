'use strict';
const { Customer, Product } = require('../../database/models');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('Sales', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    const products = await Product.findAll();
    const customers = await Customer.findAll();

    for (let index = 1; index <= products.length; index++) {

      await queryInterface.bulkInsert('Sales', [{
        customerId: faker.number.int({ min: 1, max: customers.length }),
        productId: faker.number.int({ min: 1, max: products.length }),
        total: faker.number.int({ min: 1, max: 12 }),
        price: faker.number.int({ min: 1, max: 5000 }),
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
     * await queryInterface.bulkDelete('Sales', null, {});
     */
  }
};
