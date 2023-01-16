/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  MaxLength,
  MinLength,
} from 'class-validator'
;
export class CreateSysRoleModuleDto {
@IsNumber()
accesible:number;

@IsNumber()
sys_roles_id:number;

@IsNumber()
sys_modules_id:number;

}