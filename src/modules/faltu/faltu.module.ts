/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { FaltuController } from './faltu.controller';
import { FaltuService } from './faltu.service';
import { Faltu } from './faltu.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Faltu, SysRoleTable, SysTables]), HelpersModule],
  providers: [FaltuService],
  controllers: [FaltuController],
})
export class FaltuModule {}
    