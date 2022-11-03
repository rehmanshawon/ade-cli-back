/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateRoleTestDto } from './create-role_test.dto';
export class UpdateRoleTestDto extends PartialType(CreateRoleTestDto) {}
    