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
import { Sys_typesService } from './sys_types.service';
import { CreateSys_typesDto } from './dto/create-sys_types.dto';
import { UpdateSys_typesDto } from './dto/update-sys_types.dto';

@Controller('sys_types')
export class Sys_typesController {
  constructor(private readonly sys_typesService: Sys_typesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSys_typesDto: CreateSys_typesDto, @Request() req) {
      return this.sys_typesService.create(createSys_typesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.sys_typesService.findAll(page, size, field, search);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sys_typesService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSys_typesDto: UpdateSys_typesDto,
      @Request() req,
    ) {
      return this.sys_typesService.update(+id, updateSys_typesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sys_typesService.remove(+id);
    }

  }
    