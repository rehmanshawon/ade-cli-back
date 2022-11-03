/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSample4Dto } from './create-sample4.dto';
export class UpdateSample4Dto extends PartialType(CreateSample4Dto) {}
    