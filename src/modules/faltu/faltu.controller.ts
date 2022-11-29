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
import { FaltuService } from './faltu.service';
import { CreateFaltuDto } from './dto/create-faltu.dto';
import { UpdateFaltuDto } from './dto/update-faltu.dto';

@Controller('faltu')
export class FaltuController {
  constructor(private readonly faltuService: FaltuService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFaltuDto: CreateFaltuDto, @Request() req) {
    return this.faltuService.create(createFaltuDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    console.log('hello');
    const { attributes, includes, iattributes, page, size, field, search } =
      req.query;

    return await this.faltuService.findAll(
      attributes,
      includes,
      iattributes,
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
    return this.faltuService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaltuDto: UpdateFaltuDto,
    @Request() req,
  ) {
    return this.faltuService.update(+id, updateFaltuDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.faltuService.remove(+id, req.user);
  }
}
