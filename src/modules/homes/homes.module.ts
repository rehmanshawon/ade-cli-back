/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { HomesController } from './homes.controller';
import { HomesService } from './homes.service';
import { Homes } from './homes.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Homes, SysRoleTable, SysTables]), HelpersModule],
  providers: [HomesService],
  controllers: [HomesController],
})
export class HomesModule {}
    