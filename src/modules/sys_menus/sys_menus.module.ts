/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysMenusController } from './sys_menus.controller';
import { SysMenusService } from './sys_menus.service';
import { SysMenus } from './sys_menus.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([SysMenus, SysRoleTable, SysTables]), HelpersModule],
  providers: [SysMenusService],
  controllers: [SysMenusController],
})
export class SysMenusModule {}
    