/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysRoleTableController } from './sys_role_table.controller';
import { SysRoleTableService } from './sys_role_table.service';
import { SysRoleTable } from './sys_role_table.model';

@Module({
  imports: [SequelizeModule.forFeature([SysRoleTable]), HelpersModule],
  providers: [SysRoleTableService],
  controllers: [SysRoleTableController],
})
export class SysRoleTableModule {}
    