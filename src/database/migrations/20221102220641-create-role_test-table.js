/* eslint-disable prettier/prettier */
'use strict';
module.exports = {
            async up (queryInterface, Sequelize) {
                await queryInterface.createTable('role_test', {
                    id: {                    
                    allowNull:false,
                    autoIncrement:true,             
                    primaryKey:true, 
                    type:Sequelize.INTEGER,                             
                },
					test_field:{
                    type:Sequelize.STRING,
                    allowNull:false,                                   
                    unique:true,
                                                    
                },
					isActive: {
            field: 'is_active',
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },      
          createdBy: {
            field: 'created_by',
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          updatedBy: {
            field: 'updated_by',
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          createdAt: {
            field: 'created_at',
            allowNull: false,
            type: Sequelize.DATE,        
          },
          updatedAt: {
            field: 'updated_at',
            allowNull: true,
            type: Sequelize.DATE,        
          },
          deletedAt: {
            field: 'deleted_at',
            allowNull: true,
            type: Sequelize.DATE,
          },
                });
            },

            async down (queryInterface, Sequelize) {
                await queryInterface.dropTable('role_test');
            }
        };