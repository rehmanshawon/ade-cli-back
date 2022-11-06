/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSysModulesDto } from './create-sys_modules.dto';
export class UpdateSysModulesDto extends PartialType(CreateSysModulesDto) {}
    