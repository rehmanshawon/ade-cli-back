/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysMenuPriviledgeController } from './sys_menu_priviledge.controller';
import { SysMenuPriviledgeService } from './sys_menu_priviledge.service';
import { SysMenuPriviledge } from './sys_menu_priviledge.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysMenus } from '../sys_menus/sys_menus.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      SysMenuPriviledge,
      SysRoleTable,
      SysTables,
      SysMenus,
    ]),
    HelpersModule,
  ],
  providers: [SysMenuPriviledgeService],
  controllers: [SysMenuPriviledgeController],
})
export class SysMenuPriviledgeModule {}
