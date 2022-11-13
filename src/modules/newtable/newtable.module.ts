/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { NewtableController } from './newtable.controller';
import { NewtableService } from './newtable.service';
import { Newtable } from './newtable.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Newtable, SysRoleTable, SysTables]), HelpersModule],
  providers: [NewtableService],
  controllers: [NewtableController],
})
export class NewtableModule {}
    