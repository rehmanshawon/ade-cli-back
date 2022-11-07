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

class MenuStatus {
  @IsNumber()
  @IsOptional()
  menu_id: number;

  @IsBoolean()
  accessible: boolean = true;
}
export class BulkCreateSysRoleMenuDto {
  @IsNumber()
  @IsOptional()
  role_id: number;

  @IsNumber()
  @IsOptional()
  menus: number[];

  @IsBoolean()
  accessible: boolean = true;
}
