/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { RoleTestController } from './role_test.controller';
import { RoleTestService } from './role_test.service';
import { RoleTest } from './role_test.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [
    SequelizeModule.forFeature([RoleTest, SysRoleTable, SysTables]),
    HelpersModule,
  ],
  providers: [RoleTestService],
  controllers: [RoleTestController],
})
export class RoleTestModule {}
