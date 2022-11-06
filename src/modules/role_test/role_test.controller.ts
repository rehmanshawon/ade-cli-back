/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../sys-auth/jwt-auth.guard';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { RoleTestService } from './role_test.service';
import { CreateRoleTestDto } from './dto/create-role_test.dto';
import { UpdateRoleTestDto } from './dto/update-role_test.dto';

@Controller('role_test')
export class RoleTestController {
  constructor(private readonly roleTestService: RoleTestService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRoleTestDto: CreateRoleTestDto, @Request() req) {
    return this.roleTestService.create(createRoleTestDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.roleTestService.findAll(
      page,
      size,
      field,
      search,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.roleTestService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleTestDto: UpdateRoleTestDto,
    @Request() req,
  ) {
    return this.roleTestService.update(+id, updateRoleTestDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.roleTestService.remove(+id, req.user);
  }
}
