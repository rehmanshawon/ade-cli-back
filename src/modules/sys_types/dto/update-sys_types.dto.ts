/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysTypesDto } from './create-sys_types.dto';
export class UpdateSysTypesDto extends PartialType(CreateSysTypesDto) {}
    