/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysAttributesDto } from './create-sys_attributes.dto';
export class UpdateSysAttributesDto extends PartialType(CreateSysAttributesDto) {}
    