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
import { SysMenusService } from './sys_menus.service';
import { CreateSysMenusDto } from './dto/create-sys_menus.dto';
import { UpdateSysMenusDto } from './dto/update-sys_menus.dto';

@Controller('sys_menus')
export class SysMenusController {
  constructor(private readonly sysMenusService: SysMenusService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSysMenusDto: CreateSysMenusDto, @Request() req) {
      return this.sysMenusService.create(createSysMenusDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.sysMenusService.findAll(page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.sysMenusService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSysMenusDto: UpdateSysMenusDto,
      @Request() req,
    ) {
      return this.sysMenusService.update(+id, updateSysMenusDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.sysMenusService.remove(+id, req.user);
    }

  }
    