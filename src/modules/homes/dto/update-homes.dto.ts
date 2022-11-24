/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateHomesDto } from './create-homes.dto';
export class UpdateHomesDto extends PartialType(CreateHomesDto) {}
    