/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysTablesDto } from './create-sys_tables.dto';
export class UpdateSysTablesDto extends PartialType(CreateSysTablesDto) {}
    