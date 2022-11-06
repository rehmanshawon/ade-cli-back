/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysUserModuleDto } from './create-sys_user_module.dto';
export class UpdateSysUserModuleDto extends PartialType(CreateSysUserModuleDto) {}
    