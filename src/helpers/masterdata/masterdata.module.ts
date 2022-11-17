/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { HelpersModule } from '../helpers/helpers.module';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';
import { SysAttributes } from 'src/modules/sys_attributes/sys_attributes.model';
import { SysRoleTable } from 'src/modules/sys_role_table/sys_role_table.model';
import { MasterDataController } from './masterdata.controller';
import { MasterDataService } from './masterdata.service';
import { SysMenus } from 'src/modules/sys_menus/sys_menus.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      SysTables,
      SysAttributes,
      SysRoleTable,
      SysMenus,
    ]),
    HelpersModule,
  ],
  providers: [MasterDataService],
  controllers: [MasterDataController],
})
export class MasterDataModule {}
