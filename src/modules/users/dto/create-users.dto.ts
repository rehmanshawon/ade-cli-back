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
export class CreateUsersDto {
@IsString()
name:string;

@IsString()
email:string;

@IsString()
password:string;

@IsString()
@IsOptional()
gender:string;

}