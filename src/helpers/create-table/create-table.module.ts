/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreateTableService } from './create-table.service';
import { CreateTableController } from './create-table.controller';
import { HelpersModule } from '../helpers/helpers.module';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';
import { SysAttributes } from 'src/modules/sys_attributes/sys_attributes.model';
import { SysRoleTable } from 'src/modules/sys_role_table/sys_role_table.model';

@Module({
  imports: [
    SequelizeModule.forFeature([SysTables, SysAttributes, SysRoleTable]),
    HelpersModule,
  ],
  providers: [CreateTableService],
  controllers: [CreateTableController],
})
export class CreateTableModule {}
