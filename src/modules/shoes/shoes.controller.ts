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
import { ShoesService } from './shoes.service';
import { CreateShoesDto } from './dto/create-shoes.dto';
import { UpdateShoesDto } from './dto/update-shoes.dto';

@Controller('shoes')
export class ShoesController {
  constructor(private readonly shoesService: ShoesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createShoesDto: CreateShoesDto, @Request() req) {
      return this.shoesService.create(createShoesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.shoesService.findAll(page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.shoesService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateShoesDto: UpdateShoesDto,
      @Request() req,
    ) {
      return this.shoesService.update(+id, updateShoesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.shoesService.remove(+id, req.user);
    }

  }
    