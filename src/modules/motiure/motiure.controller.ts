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
import { MotiureService } from './motiure.service';
import { CreateMotiureDto } from './dto/create-motiure.dto';
import { UpdateMotiureDto } from './dto/update-motiure.dto';

@Controller('motiure')
export class MotiureController {
  constructor(private readonly motiureService: MotiureService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createMotiureDto: CreateMotiureDto, @Request() req) {
      return this.motiureService.create(createMotiureDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.motiureService.findAll(page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.motiureService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateMotiureDto: UpdateMotiureDto,
      @Request() req,
    ) {
      return this.motiureService.update(+id, updateMotiureDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.motiureService.remove(+id, req.user);
    }

  }
    