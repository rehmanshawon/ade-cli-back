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
import { SysRolesService } from './sys_roles.service';
import { CreateSysRolesDto } from './dto/create-sys_roles.dto';
import { UpdateSysRolesDto } from './dto/update-sys_roles.dto';

@Controller('sys_roles')
export class SysRolesController {
  constructor(private readonly sysRolesService: SysRolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSysRolesDto: CreateSysRolesDto, @Request() req) {
    return this.sysRolesService.create(createSysRolesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.sysRolesService.findAll(page, size, field, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysRolesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSysRolesDto: UpdateSysRolesDto,
    @Request() req,
  ) {
    return this.sysRolesService.update(+id, updateSysRolesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysRolesService.remove(+id);
  }
}
