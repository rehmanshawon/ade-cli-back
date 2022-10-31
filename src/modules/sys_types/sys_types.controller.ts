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
import { SysTypesService } from './sys_types.service';
import { CreateSysTypesDto } from './dto/create-sys_types.dto';
import { UpdateSysTypesDto } from './dto/update-sys_types.dto';

@Controller('sys_types')
export class SysTypesController {
  constructor(private readonly sys_typesService: SysTypesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSysTypesDto: CreateSysTypesDto, @Request() req) {
      return this.sys_typesService.create(createSysTypesDto, req.user);
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
      @Body() updateSysTypesDto: UpdateSysTypesDto,
      @Request() req,
    ) {
      return this.sys_typesService.update(+id, updateSysTypesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sys_typesService.remove(+id);
    }

  }
    