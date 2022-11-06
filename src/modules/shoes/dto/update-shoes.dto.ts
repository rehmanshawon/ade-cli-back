/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateShoesDto } from './create-shoes.dto';
export class UpdateShoesDto extends PartialType(CreateShoesDto) {}
    