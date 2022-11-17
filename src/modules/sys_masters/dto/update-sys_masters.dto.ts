/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysMastersDto } from './create-sys_masters.dto';
export class UpdateSysMastersDto extends PartialType(CreateSysMastersDto) {}
    