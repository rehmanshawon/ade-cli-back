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
import { WriterService } from './writer.service';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';

@Controller('writer')
export class WriterController {
  constructor(private readonly writerService: WriterService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createWriterDto: CreateWriterDto, @Request() req) {
      return this.writerService.create(createWriterDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

      return await this.writerService.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.writerService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateWriterDto: UpdateWriterDto,
      @Request() req,
    ) {
      return this.writerService.update(+id, updateWriterDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.writerService.remove(+id, req.user);
    }

  }
    