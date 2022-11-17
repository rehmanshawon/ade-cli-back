/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysMastersController } from './sys_masters.controller';
import { SysMastersService } from './sys_masters.service';
import { SysMasters } from './sys_masters.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([SysMasters, SysRoleTable, SysTables]), HelpersModule],
  providers: [SysMastersService],
  controllers: [SysMastersController],
})
export class SysMastersModule {}
    