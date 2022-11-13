/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateNewtableDto } from './create-newtable.dto';
export class UpdateNewtableDto extends PartialType(CreateNewtableDto) {}
    