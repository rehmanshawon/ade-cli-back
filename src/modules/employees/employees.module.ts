/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employees } from './employees.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Employees, SysRoleTable, SysTables]), HelpersModule],
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
    