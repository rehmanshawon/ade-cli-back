/* eslint-disable prettier/prettier */
import { RoleTestModule } from 'src/modules/role_test/role_test.module';

import { RoleTest } from 'src/modules/role_test/role_test.model';

import { SysRoleTableModule } from 'src/modules/sys_role_table/sys_role_table.module';

import { SysRoleTable } from 'src/modules/sys_role_table/sys_role_table.model';

import { SysUsersModule } from 'src/modules/sys_users/sys_users.module';

import { SysUsers } from 'src/modules/sys_users/sys_users.model';

import { SysRolesModule } from 'src/modules/sys_roles/sys_roles.module';

import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';

import { SysAttributesModule } from 'src/modules/sys_attributes/sys_attributes.module';

import { SysAttributes } from 'src/modules/sys_attributes/sys_attributes.model';

import { SysTablesModule } from 'src/modules/sys_tables/sys_tables.module';

import { SysTables } from 'src/modules/sys_tables/sys_tables.model';
import { AuthModule } from './modules/sys-auth/sys-auth.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { CreateTableModule } from './helpers/create-table/create-table.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomeExceptionsFilter } from './custome-exceptions.filter';

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
      models: [
        RoleTest,
        SysRoleTable,
        SysUsers,
        SysRoles,
        SysAttributes,
        SysTables,
      ],
    }),
    AuthModule,
    CreateTableModule,
    RoleTestModule,
    SysRoleTableModule,
    SysUsersModule,
    SysRolesModule,
    SysAttributesModule,
    SysTablesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CustomeExceptionsFilter },
  ],
})
export class AppModule {}
