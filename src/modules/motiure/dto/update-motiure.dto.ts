/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateMotiureDto } from './create-motiure.dto';
export class UpdateMotiureDto extends PartialType(CreateMotiureDto) {}
    