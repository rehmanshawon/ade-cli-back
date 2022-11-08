/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { MusabbirController } from './musabbir.controller';
import { MusabbirService } from './musabbir.service';
import { Musabbir } from './musabbir.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Musabbir, SysRoleTable, SysTables]), HelpersModule],
  providers: [MusabbirService],
  controllers: [MusabbirController],
})
export class MusabbirModule {}
    