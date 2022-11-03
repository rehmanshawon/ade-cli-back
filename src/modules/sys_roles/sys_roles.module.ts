/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysRolesController } from './sys_roles.controller';
import { SysRolesService } from './sys_roles.service';
import { SysRoles } from './sys_roles.model';

@Module({
  imports: [SequelizeModule.forFeature([SysRoles]), HelpersModule],
  providers: [SysRolesService],
  controllers: [SysRolesController],
})
export class SysRolesModule {}
    