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
import { MusabbirService } from './musabbir.service';
import { CreateMusabbirDto } from './dto/create-musabbir.dto';
import { UpdateMusabbirDto } from './dto/update-musabbir.dto';

@Controller('musabbir')
export class MusabbirController {
  constructor(private readonly musabbirService: MusabbirService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createMusabbirDto: CreateMusabbirDto, @Request() req) {
      return this.musabbirService.create(createMusabbirDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.musabbirService.findAll(page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.musabbirService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateMusabbirDto: UpdateMusabbirDto,
      @Request() req,
    ) {
      return this.musabbirService.update(+id, updateMusabbirDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.musabbirService.remove(+id, req.user);
    }

  }
    