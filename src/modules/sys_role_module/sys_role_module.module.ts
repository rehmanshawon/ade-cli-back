/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysRoleModuleController } from './sys_role_module.controller';
import { SysRoleModuleService } from './sys_role_module.service';
import { SysRoleModule } from './sys_role_module.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([SysRoleModule, SysRoleTable, SysTables]), HelpersModule],
  providers: [SysRoleModuleService],
  controllers: [SysRoleModuleController],
})
export class SysRoleModuleModule {}
    