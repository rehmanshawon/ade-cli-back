/* eslint-disable prettier/prettier */
'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('sys_users',[{
    user_name: "super",    
    email: "super@email.com",
    password:await bcrypt.hash('123456', 10),
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date()
  }],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sys_users', null, {});
  }
};
