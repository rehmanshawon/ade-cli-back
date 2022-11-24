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
import { HomesService } from './homes.service';
import { CreateHomesDto } from './dto/create-homes.dto';
import { UpdateHomesDto } from './dto/update-homes.dto';

@Controller('homes')
export class HomesController {
  constructor(private readonly homesService: HomesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createHomesDto: CreateHomesDto, @Request() req) {
      return this.homesService.create(createHomesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { attributes,includes,iattributes, page, size, field, search } = req.query;

      return await this.homesService.findAll(attributes, includes, iattributes, page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.homesService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateHomesDto: UpdateHomesDto,
      @Request() req,
    ) {
      return this.homesService.update(+id, updateHomesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.homesService.remove(+id, req.user);
    }

  }
    