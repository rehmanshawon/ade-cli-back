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
   // for sys_roles
   dummyJSON.push({
    attribute_name: "id",   
    attribute_type:"number",
    primaryKey:true,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "role_name",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "is_active",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "deleted_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:1,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });

   // for sys_users
   dummyJSON.push({
    attribute_name: "id",   
    attribute_type:"number",
    primaryKey:true,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "user_name",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "email",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "password",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "role_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:true,
    foreign_table_id:1,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "is_active",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "deleted_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:2,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });

   //for sys_tables
   dummyJSON.push({
    attribute_name: "id",   
    attribute_type:"number",
    primaryKey:true,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:3,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "table_name",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:3,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "is_active",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:3,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:3,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:3,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "deleted_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:3,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:3,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:3,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });

   // for sys_menus
   dummyJSON.push({
    attribute_name: "id",   
    attribute_type:"number",
    primaryKey:true,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "menu_name",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "menu_url",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "menu_icon_url",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "menu_order",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "parent_menu",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "module_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:true,
    foreign_table_id:5,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "is_active",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "deleted_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:4,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });

   // for sys_modules
   dummyJSON.push({
    attribute_name: "id",   
    attribute_type:"number",
    primaryKey:true,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "module_name",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "module_url",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "module_icon_url",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   }); 
   dummyJSON.push({
    attribute_name: "is_active",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "deleted_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:5,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });

   //for sys_role_table
   dummyJSON.push({
    attribute_name: "id",   
    attribute_type:"number",
    primaryKey:true,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "access_type",   
    attribute_type:"enum",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   }); 
   dummyJSON.push({
    attribute_name: "role_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:true,
    foreign_table_id:1,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "table_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:true,
    foreign_table_id:3,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "is_active",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "deleted_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:6,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   // for sys_role_menu
   dummyJSON.push({
    attribute_name: "id",   
    attribute_type:"number",
    primaryKey:true,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "accessible",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   }); 
   dummyJSON.push({
    attribute_name: "role_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:true,
    foreign_table_id:1,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "menu_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:true,
    foreign_table_id:4,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "is_active",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "deleted_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:7,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   // for sys_attributes
   dummyJSON.push({
    attribute_name: "id",   
    attribute_type:"number",
    primaryKey:true,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "attribute_name",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   }); 
   dummyJSON.push({
    attribute_name: "sys_table_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:true,
    foreign_table_id:3,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "attribute_type",   
    attribute_type:"string",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "primaryKey",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "foreignKey",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "foreign_table_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "is_active",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "deleted_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:8,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });

   // for sys_user_module
   dummyJSON.push({
    attribute_name: "id",   
    attribute_type:"number",
    primaryKey:true,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "accessible",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   }); 
   dummyJSON.push({
    attribute_name: "user_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:true,
    foreign_table_id:2,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "module_id",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:true,
    foreign_table_id:5,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "is_active",   
    attribute_type:"boolean",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_by",   
    attribute_type:"number",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "deleted_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "created_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
   dummyJSON.push({
    attribute_name: "updated_at",   
    attribute_type:"Date",
    primaryKey:false,
    foreignKey:false,
    foreign_table_id:null,
    sys_table_id:9,
    created_by:1,    
    created_at : new Date(),
    updated_at : new Date() 
   });
    await queryInterface.bulkInsert('sys_attributes',dummyJSON,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sys_attributes', null, {});
  }
};
