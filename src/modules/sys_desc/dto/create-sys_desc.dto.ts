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
export class CreateSysDescDto {
@IsString()
desc_field:string;

@IsString()
desc_detail:string;

@IsNumber()
@IsOptional()
sys_table_id:number;

}