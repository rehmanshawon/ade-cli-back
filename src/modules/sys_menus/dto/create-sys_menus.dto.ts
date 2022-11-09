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
} from 'class-validator';
export class CreateSysMenusDto {
  @IsString()
  menu_name: string;

  @IsString()
  @IsOptional()
  menu_url: string;

  @IsString()
  @IsOptional()
  menu_icon_url: string;

  @IsNumber()
  @IsOptional()
  menu_order: number;

  @IsNumber()
  @IsOptional()
  parent_menu: number;

  @IsNumber()
  @IsOptional()
  module_id: number;
}
