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
export class CreatePostsDto {
@IsString()
title:string;

@IsString()
@IsOptional()
body:string;

@IsNumber()
@IsOptional()
user_id:number;

@IsNumber()
@IsOptional()
category_id:number;

}