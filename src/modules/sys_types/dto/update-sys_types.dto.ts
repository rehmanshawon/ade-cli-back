/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSys_typesDto } from './create-sys_types.dto';
export class UpdateSys_typesDto extends PartialType(CreateSys_typesDto) {}
    