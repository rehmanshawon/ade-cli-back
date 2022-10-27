/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDecimal,
  IsDate,
  IsUUID,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

class referenceDefinition {
  relation: string; //1:1, 1:N, N:N
  left_table_key: string;
  right_table_key: string;
  left_table: string;
  right_table: string;
  join_table: string; // required for N:N relationship
}

class fieldDefinition {
  @IsString()
  field: string;

  @IsString()
  @IsOptional()
  type: string = 'string';

  @IsBoolean()
  @IsOptional()
  unique: boolean = false;

  @IsBoolean()
  @IsOptional()
  optional: boolean = true;

  @IsBoolean()
  @IsOptional()
  autoIncrement: boolean = false;

  @IsString()
  @IsOptional()
  default: any = null;

  @IsNumber()
  @IsOptional()
  minLength: number = 0;

  @IsNumber()
  @IsOptional()
  maxLength: number = 0;

  @IsBoolean()
  @IsOptional()
  primaryKey: boolean = false;

  @IsBoolean()
  @IsOptional()
  foreignKey: boolean = false;

  @IsOptional()
  reference: referenceDefinition;
}

export class CreateTableDto {
  tableName: string;
  @ApiProperty({
    isArray: true,
    type: fieldDefinition,
  })
  fieldList: fieldDefinition[];
}
