/* eslint-disable prettier/prettier */
import { Sample3Module } from 'src/modules/sample3/sample3.module';

import {Sample3} from 'src/modules/sample3/sample3.model';

import { SampleModule } from 'src/modules/sample/sample.module';

import {Sample} from 'src/modules/sample/sample.model';

import { SysAttributesModule } from 'src/modules/sys_attributes/sys_attributes.module';

import {SysAttributes} from 'src/modules/sys_attributes/sys_attributes.model';

import { SysTablesModule } from 'src/modules/sys_tables/sys_tables.module';

import {SysTables} from 'src/modules/sys_tables/sys_tables.model';

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
      models: [Sample3,Sample,SysAttributes,SysTables,SysUser, SysRole],
    }),
    UserModule,
    AuthModule,
    SysRolesModule,
    CreateTableModule,Sample3Module,SampleModule,SysAttributesModule,SysTablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
