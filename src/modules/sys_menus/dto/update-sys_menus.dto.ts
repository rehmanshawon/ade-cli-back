/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysMenusDto } from './create-sys_menus.dto';
export class UpdateSysMenusDto extends PartialType(CreateSysMenusDto) {}
    