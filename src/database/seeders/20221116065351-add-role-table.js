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
    access_type: "All",   
    role_id:1,
    table_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    access_type: "All",   
    role_id:1,
    table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    access_type: "All",   
    role_id:1,
    table_id:3,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    access_type: "All",   
    role_id:1,
    table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    access_type: "All",   
    role_id:1,
    table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    access_type: "All",   
    role_id:1,
    table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    access_type: "All",   
    role_id:1,
    table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    access_type: "All",   
    role_id:1,
    table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    access_type: "All",   
    role_id:1,
    table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   await queryInterface.bulkInsert('sys_role_table',dummyJSON,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sys_role_table', null, {});
  }
};
