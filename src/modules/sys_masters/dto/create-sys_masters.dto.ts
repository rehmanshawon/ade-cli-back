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
export class CreateSysMastersDto {
  @IsString()
  slug_name: string;

  @IsString()
  @IsOptional()
  slug_type: string;

  @IsOptional()
  query_tables: tableList[];

  @IsOptional()
  create_params: string;

  @IsOptional()
  update_params: string;
}

class fieldDef {
  fieldName: string;
  columnName: string;
  fieldType: string;
  foreignKey: string;
  include: boolean;
}

class tableList {
  tableName: string;
  fieldList: fieldDef[];
}
