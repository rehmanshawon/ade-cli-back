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
export class CreateEmployeesDto {
@IsString()
employe_name:string;

@IsNumber()
farms_id:number;

@IsString()
employe_phone:string;

}