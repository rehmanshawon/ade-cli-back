/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';    
//import { IsString, MinLength, MaxLength, IsBoolean, IsArray } from 'class-validator';    

class refereceDefinition{
  relation:string; //1:1, 1:N, N:N
  left_table_key:string;
  right_table_key:string;
  left_table:string;
  right_table:string;
  join_table:string; // required for N:N relationship
 }

class fieldDefinition {    
    field: string;   
    type: string;    
    unique:boolean;    
    optional: boolean;
    autoIncrement:boolean;      
    default: string;    
    primaryKey:boolean;
    foreignKey:boolean;  
    referece: refereceDefinition;  
  }
  

export class CreateTableDto {
    tableName: string;
    @ApiProperty({
        isArray: true,
        type: fieldDefinition,
      })
    fieldList:fieldDefinition[]
  }