/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateMusabbirDto } from './create-musabbir.dto';
export class UpdateMusabbirDto extends PartialType(CreateMusabbirDto) {}
    