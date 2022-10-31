/* eslint-disable prettier/prettier */
import { SysTypesModule } from 'src/modules/sys_types/sys_types.module';

import {SysTypes} from 'src/modules/sys_types/sys_types.model';


import { EmployeeModule } from 'src/modules/employee/employee.module';

import { Employee } from 'src/modules/employee/employee.model';

import { DepartmentModule } from 'src/modules/department/department.module';

import { Department } from 'src/modules/department/department.model';

import { PostsModule } from 'src/modules/posts/posts.module';

import { Category } from 'src/modules/category/category.model';

import { Users } from 'src/modules/users/users.model';

import { Posts } from 'src/modules/posts/posts.model';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SysUser } from './modules/sys-users/models/sys-users.model';
import { UserModule } from './modules/sys-users/sys-users.module';
import { AuthModule } from './modules/sys-auth/sys-auth.module';
import { ConfigModule } from '@nestjs/config';
import { SysRolesModule } from './modules/sys_roles/sys_roles.module';
import { SysRole } from './modules/sys_roles/models/sys-roles.model';
import { CreateTableModule } from './helpers/create-table/create-table.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect:
        process.env.DB_DIALECT == 'mysql'
          ? `mysql`
          : process.env.DB_DIALECT == 'postgres'
          ? `postgres`
          : process.env.DB_DIALECT == 'oracle'
          ? `oracle`
          : 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,
      models: [SysTypes,Employee, Department, Category, Users, Posts, SysUser, SysRole],
    }),
    UserModule,
    AuthModule,
    SysRolesModule,
    CreateTableModule,SysTypesModule,
    EmployeeModule,
    DepartmentModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
