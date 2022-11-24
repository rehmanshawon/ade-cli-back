/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateFarmsDto } from './create-farms.dto';
export class UpdateFarmsDto extends PartialType(CreateFarmsDto) {}
    