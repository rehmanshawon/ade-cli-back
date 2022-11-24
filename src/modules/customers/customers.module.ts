/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customers } from './customers.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Customers, SysRoleTable, SysTables]), HelpersModule],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
    