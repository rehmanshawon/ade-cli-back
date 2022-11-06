/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { RoleAuthTestController } from './role_auth_test.controller';
import { RoleAuthTestService } from './role_auth_test.service';
import { RoleAuthTest } from './role_auth_test.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([RoleAuthTest, SysRoleTable, SysTables]), HelpersModule],
  providers: [RoleAuthTestService],
  controllers: [RoleAuthTestController],
})
export class RoleAuthTestModule {}
    