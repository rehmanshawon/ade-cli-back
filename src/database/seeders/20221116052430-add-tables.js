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
    table_name: "sys_roles",
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    table_name: "sys_users",
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    table_name: "sys_tables",
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    table_name: "sys_menus",
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    table_name: "sys_modules",
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    table_name: "sys_role_table",
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    table_name: "sys_role_menu",
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    table_name: "sys_attributes",
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    table_name: "sys_user_module",
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   await queryInterface.bulkInsert('sys_tables',dummyJSON,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sys_tables', null, {});
  }
  
};
