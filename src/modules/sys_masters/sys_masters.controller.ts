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
import { SysMastersService } from './sys_masters.service';
import { CreateSysMastersDto } from './dto/create-sys_masters.dto';
import { UpdateSysMastersDto } from './dto/update-sys_masters.dto';

@Controller('sys_masters')
export class SysMastersController {
  constructor(private readonly sysMastersService: SysMastersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSysMastersDto: CreateSysMastersDto, @Request() req) {
    //console.log(createSysMastersDto);
    //return createSysMastersDto;
    return this.sysMastersService.create(createSysMastersDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.sysMastersService.findAll(
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
    return this.sysMastersService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('api')
  findBySlug(@Request() req) {
    const { slug_name, slug_type } = req.query;
    return this.sysMastersService.findBySlug(slug_name, slug_type, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSysMastersDto: UpdateSysMastersDto,
    @Request() req,
  ) {
    return this.sysMastersService.update(+id, updateSysMastersDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.sysMastersService.remove(+id, req.user);
  }
}
