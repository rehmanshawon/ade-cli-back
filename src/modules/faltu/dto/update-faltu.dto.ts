/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateFaltuDto } from './create-faltu.dto';
export class UpdateFaltuDto extends PartialType(CreateFaltuDto) {}
    