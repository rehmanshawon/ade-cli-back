/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Sys_Roles', {
      id: {
        field: 'role_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },      
      roleName: {
        field: 'role_name',
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
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

      await queryInterface.createTable('Sys_Users', {
        id: {
          field: 'user_id',
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },     
      userName: {
        field: 'user_name',
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,       
      },
      isActive: {
        field: 'is_active',
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      role_id: {
        type: Sequelize.INTEGER,        
        references: {
          model: 'sys_roles',
          key: 'role_id',
        },
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('Sys_Users');
     await queryInterface.dropTable('Sys_Roles');
  }
};
