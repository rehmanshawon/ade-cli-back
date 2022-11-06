/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysUserModuleController } from './sys_user_module.controller';
import { SysUserModuleService } from './sys_user_module.service';
import { SysUserModule } from './sys_user_module.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([SysUserModule, SysRoleTable, SysTables]), HelpersModule],
  providers: [SysUserModuleService],
  controllers: [SysUserModuleController],
})
export class SysUserModuleModule {}
    