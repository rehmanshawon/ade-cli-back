/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysModulesController } from './sys_modules.controller';
import { SysModulesService } from './sys_modules.service';
import { SysModules } from './sys_modules.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([SysModules, SysRoleTable, SysTables]), HelpersModule],
  providers: [SysModulesService],
  controllers: [SysModulesController],
})
export class SysModulesModule {}
    