/* eslint-disable prettier/prettier */
'use strict';

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
   var dummyJSON = [];
   dummyJSON.push({
    accessible: true,   
    user_id:1,
    module_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   await queryInterface.bulkInsert('sys_user_module',dummyJSON,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sys_user_module', null, {});
  }
};
