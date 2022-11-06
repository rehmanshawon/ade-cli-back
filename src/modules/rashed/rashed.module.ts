/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { RashedController } from './rashed.controller';
import { RashedService } from './rashed.service';
import { Rashed } from './rashed.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Rashed, SysRoleTable, SysTables]), HelpersModule],
  providers: [RashedService],
  controllers: [RashedController],
})
export class RashedModule {}
    