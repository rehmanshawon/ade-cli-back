/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSample3Dto } from './create-sample3.dto';
export class UpdateSample3Dto extends PartialType(CreateSample3Dto) {}
    