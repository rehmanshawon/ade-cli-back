/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysUsersDto } from './create-sys_users.dto';
export class UpdateSysUsersDto extends PartialType(CreateSysUsersDto) {}
    