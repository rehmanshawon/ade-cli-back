/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateRoleAuthTestDto } from './create-role_auth_test.dto';
export class UpdateRoleAuthTestDto extends PartialType(CreateRoleAuthTestDto) {}
    