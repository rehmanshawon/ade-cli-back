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
import { SysModulesService } from './sys_modules.service';
import { CreateSysModulesDto } from './dto/create-sys_modules.dto';
import { UpdateSysModulesDto } from './dto/update-sys_modules.dto';

@Controller('sys_modules')
export class SysModulesController {
  constructor(private readonly sysModulesService: SysModulesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSysModulesDto: CreateSysModulesDto, @Request() req) {
      return this.sysModulesService.create(createSysModulesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.sysModulesService.findAll(page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.sysModulesService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSysModulesDto: UpdateSysModulesDto,
      @Request() req,
    ) {
      return this.sysModulesService.update(+id, updateSysModulesDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.sysModulesService.remove(+id, req.user);
    }

  }
    