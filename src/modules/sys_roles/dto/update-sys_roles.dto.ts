/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysRolesDto } from './create-sys_roles.dto';
export class UpdateSysRolesDto extends PartialType(CreateSysRolesDto) {}
    