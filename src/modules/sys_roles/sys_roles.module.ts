/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SysRolesService } from './sys_roles.service';
import { SysRolesController } from './sys_roles.controller';

@Module({
  providers: [SysRolesService],
  controllers: [SysRolesController]
})
export class SysRolesModule {}
