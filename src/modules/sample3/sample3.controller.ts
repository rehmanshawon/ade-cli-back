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
import { Sample3Service } from './sample3.service';
import { CreateSample3Dto } from './dto/create-sample3.dto';
import { UpdateSample3Dto } from './dto/update-sample3.dto';

@Controller('sample3')
export class Sample3Controller {
  constructor(private readonly sample3Service: Sample3Service) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSample3Dto: CreateSample3Dto, @Request() req) {
      return this.sample3Service.create(createSample3Dto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.sample3Service.findAll(page, size, field, search);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sample3Service.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSample3Dto: UpdateSample3Dto,
      @Request() req,
    ) {
      return this.sample3Service.update(+id, updateSample3Dto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sample3Service.remove(+id);
    }

  }
    