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
import { Sample4Service } from './sample4.service';
import { CreateSample4Dto } from './dto/create-sample4.dto';
import { UpdateSample4Dto } from './dto/update-sample4.dto';

@Controller('sample4')
export class Sample4Controller {
  constructor(private readonly sample4Service: Sample4Service) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSample4Dto: CreateSample4Dto, @Request() req) {
      return this.sample4Service.create(createSample4Dto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.sample4Service.findAll(page, size, field, search);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sample4Service.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSample4Dto: UpdateSample4Dto,
      @Request() req,
    ) {
      return this.sample4Service.update(+id, updateSample4Dto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sample4Service.remove(+id);
    }

  }
    