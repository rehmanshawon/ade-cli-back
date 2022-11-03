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
import { SysTablesService } from './sys_tables.service';
import { CreateSysTablesDto } from './dto/create-sys_tables.dto';
import { UpdateSysTablesDto } from './dto/update-sys_tables.dto';

@Controller('sys_tables')
export class SysTablesController {
  constructor(private readonly sysTablesService: SysTablesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSysTablesDto: CreateSysTablesDto, @Request() req) {
    return this.sysTablesService.create(createSysTablesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.sysTablesService.findAll(page, size, field, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysTablesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSysTablesDto: UpdateSysTablesDto,
    @Request() req,
  ) {
    return this.sysTablesService.update(+id, updateSysTablesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysTablesService.remove(+id);
  }
}
