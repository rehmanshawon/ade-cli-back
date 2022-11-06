/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysRoleMenuController } from './sys_role_menu.controller';
import { SysRoleMenuService } from './sys_role_menu.service';
import { SysRoleMenu } from './sys_role_menu.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([SysRoleMenu, SysRoleTable, SysTables]), HelpersModule],
  providers: [SysRoleMenuService],
  controllers: [SysRoleMenuController],
})
export class SysRoleMenuModule {}
    