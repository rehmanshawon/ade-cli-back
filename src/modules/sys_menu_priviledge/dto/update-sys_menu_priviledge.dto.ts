/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysMenuPriviledgeDto } from './create-sys_menu_priviledge.dto';
export class UpdateSysMenuPriviledgeDto extends PartialType(
  CreateSysMenuPriviledgeDto,
) {}
