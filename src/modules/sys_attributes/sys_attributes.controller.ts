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
import { SysAttributesService } from './sys_attributes.service';
import { CreateSysAttributesDto } from './dto/create-sys_attributes.dto';
import { UpdateSysAttributesDto } from './dto/update-sys_attributes.dto';

@Controller('sys_attributes')
export class SysAttributesController {
  constructor(private readonly sysAttributesService: SysAttributesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createSysAttributesDto: CreateSysAttributesDto,
    @Request() req,
  ) {
    return this.sysAttributesService.create(createSysAttributesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.sysAttributesService.findAll(page, size, field, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysAttributesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSysAttributesDto: UpdateSysAttributesDto,
    @Request() req,
  ) {
    return this.sysAttributesService.update(
      +id,
      updateSysAttributesDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysAttributesService.remove(+id);
  }
}
