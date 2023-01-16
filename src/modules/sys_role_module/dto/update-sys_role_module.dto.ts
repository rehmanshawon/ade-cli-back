/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysRoleModuleDto } from './create-sys_role_module.dto';
export class UpdateSysRoleModuleDto extends PartialType(CreateSysRoleModuleDto) {}
    