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
import { FarmsService } from './farms.service';
import { CreateFarmsDto } from './dto/create-farms.dto';
import { UpdateFarmsDto } from './dto/update-farms.dto';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createFarmsDto: CreateFarmsDto, @Request() req) {
      return this.farmsService.create(createFarmsDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { attributes,includes,iattributes, page, size, field, search } = req.query;

      return await this.farmsService.findAll(attributes, includes, iattributes, page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.farmsService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateFarmsDto: UpdateFarmsDto,
      @Request() req,
    ) {
      return this.farmsService.update(+id, updateFarmsDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.farmsService.remove(+id, req.user);
    }

  }
    