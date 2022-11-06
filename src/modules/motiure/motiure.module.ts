/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { MotiureController } from './motiure.controller';
import { MotiureService } from './motiure.service';
import { Motiure } from './motiure.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Motiure, SysRoleTable, SysTables]), HelpersModule],
  providers: [MotiureService],
  controllers: [MotiureController],
})
export class MotiureModule {}
    