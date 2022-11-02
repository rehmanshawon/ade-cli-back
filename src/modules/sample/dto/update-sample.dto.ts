/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSampleDto } from './create-sample.dto';
export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
    