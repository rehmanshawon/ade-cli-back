/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { Farms } from './farms.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Farms, SysRoleTable, SysTables]), HelpersModule],
  providers: [FarmsService],
  controllers: [FarmsController],
})
export class FarmsModule {}
    