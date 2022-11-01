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
import { SysTypesService } from './sys_types.service';
import { CreateSysTypesDto } from './dto/create-sys_types.dto';
import { UpdateSysTypesDto } from './dto/update-sys_types.dto';

@Controller('sys_types')
export class SysTypesController {
  constructor(private readonly sysTypesService: SysTypesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSysTypesDto: CreateSysTypesDto, @Request() req) {
      return this.sysTypesService.create(createSysTypesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.sysTypesService.findAll(page, size, field, search);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sysTypesService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSysTypesDto: UpdateSysTypesDto,
      @Request() req,
    ) {
      return this.sysTypesService.update(+id, updateSysTypesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sysTypesService.remove(+id);
    }

  }
    