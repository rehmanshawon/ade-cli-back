/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateRashedDto } from './create-rashed.dto';
export class UpdateRashedDto extends PartialType(CreateRashedDto) {}
    