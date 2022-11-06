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
import { RoleAuthTestService } from './role_auth_test.service';
import { CreateRoleAuthTestDto } from './dto/create-role_auth_test.dto';
import { UpdateRoleAuthTestDto } from './dto/update-role_auth_test.dto';

@Controller('role_auth_test')
export class RoleAuthTestController {
  constructor(private readonly roleAuthTestService: RoleAuthTestService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createRoleAuthTestDto: CreateRoleAuthTestDto, @Request() req) {
      return this.roleAuthTestService.create(createRoleAuthTestDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.roleAuthTestService.findAll(page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.roleAuthTestService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateRoleAuthTestDto: UpdateRoleAuthTestDto,
      @Request() req,
    ) {
      return this.roleAuthTestService.update(+id, updateRoleAuthTestDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.roleAuthTestService.remove(+id, req.user);
    }

  }
    