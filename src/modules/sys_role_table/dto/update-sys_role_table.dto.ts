/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysRoleTableDto } from './create-sys_role_table.dto';
export class UpdateSysRoleTableDto extends PartialType(CreateSysRoleTableDto) {}
    