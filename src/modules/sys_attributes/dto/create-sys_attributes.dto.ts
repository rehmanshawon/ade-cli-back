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
export class CreateSysAttributesDto {
@IsString()
attribute_name:string;

@IsBoolean()
primaryKey:boolean;

@IsNumber()
@IsOptional()
sys_table_id:number;

@IsNumber()
@IsOptional()
sys_type_id:number;

}