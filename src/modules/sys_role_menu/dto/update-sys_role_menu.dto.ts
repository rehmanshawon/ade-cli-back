/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysRoleMenuDto } from './create-sys_role_menu.dto';
export class UpdateSysRoleMenuDto extends PartialType(CreateSysRoleMenuDto) {}
    