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
import { SysDescService } from './sys_desc.service';
import { CreateSysDescDto } from './dto/create-sys_desc.dto';
import { UpdateSysDescDto } from './dto/update-sys_desc.dto';

@Controller('sys_desc')
export class SysDescController {
  constructor(private readonly sysDescService: SysDescService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSysDescDto: CreateSysDescDto, @Request() req) {
      return this.sysDescService.create(createSysDescDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.sysDescService.findAll(page, size, field, search);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sysDescService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSysDescDto: UpdateSysDescDto,
      @Request() req,
    ) {
      return this.sysDescService.update(+id, updateSysDescDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sysDescService.remove(+id);
    }

  }
    