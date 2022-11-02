/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysDescDto } from './create-sys_desc.dto';
export class UpdateSysDescDto extends PartialType(CreateSysDescDto) {}
    