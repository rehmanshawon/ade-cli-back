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
import { RashedService } from './rashed.service';
import { CreateRashedDto } from './dto/create-rashed.dto';
import { UpdateRashedDto } from './dto/update-rashed.dto';

@Controller('rashed')
export class RashedController {
  constructor(private readonly rashedService: RashedService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createRashedDto: CreateRashedDto, @Request() req) {
      return this.rashedService.create(createRashedDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.rashedService.findAll(page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.rashedService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateRashedDto: UpdateRashedDto,
      @Request() req,
    ) {
      return this.rashedService.update(+id, updateRashedDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.rashedService.remove(+id, req.user);
    }

  }
    