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
export class CreateSysMenuPriviledgeDto {
  @IsNumber()
  @IsOptional()
  menu_id: number;

  @IsNumber()
  @IsOptional()
  role_id: number;

  @IsNumber()
  @IsOptional()
  module_id: number;
}
// export class CreateSysMenuPriviledgesDto {
//   priviledges: CreateSysMenuPriviledgeDto[];
// }
