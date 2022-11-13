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
import { NewtableService } from './newtable.service';
import { CreateNewtableDto } from './dto/create-newtable.dto';
import { UpdateNewtableDto } from './dto/update-newtable.dto';

@Controller('newtable')
export class NewtableController {
  constructor(private readonly newtableService: NewtableService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createNewtableDto: CreateNewtableDto, @Request() req) {
      return this.newtableService.create(createNewtableDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.newtableService.findAll(page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.newtableService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateNewtableDto: UpdateNewtableDto,
      @Request() req,
    ) {
      return this.newtableService.update(+id, updateNewtableDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.newtableService.remove(+id, req.user);
    }

  }
    