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
import { SysUserModuleService } from './sys_user_module.service';
import { CreateSysUserModuleDto } from './dto/create-sys_user_module.dto';
import { UpdateSysUserModuleDto } from './dto/update-sys_user_module.dto';

@Controller('sys_user_module')
export class SysUserModuleController {
  constructor(private readonly sysUserModuleService: SysUserModuleService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSysUserModuleDto: CreateSysUserModuleDto, @Request() req) {
      return this.sysUserModuleService.create(createSysUserModuleDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.sysUserModuleService.findAll(page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.sysUserModuleService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSysUserModuleDto: UpdateSysUserModuleDto,
      @Request() req,
    ) {
      return this.sysUserModuleService.update(+id, updateSysUserModuleDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.sysUserModuleService.remove(+id, req.user);
    }

  }
    