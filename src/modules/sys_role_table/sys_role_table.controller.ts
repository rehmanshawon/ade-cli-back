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
import { SysRoleTableService } from './sys_role_table.service';
import { CreateSysRoleTableDto } from './dto/create-sys_role_table.dto';
import { UpdateSysRoleTableDto } from './dto/update-sys_role_table.dto';

@Controller('sys_role_table')
export class SysRoleTableController {
  constructor(private readonly sysRoleTableService: SysRoleTableService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSysRoleTableDto: CreateSysRoleTableDto, @Request() req) {
      return this.sysRoleTableService.create(createSysRoleTableDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { page, size, field, search } = req.query;

      return await this.sysRoleTableService.findAll(page, size, field, search);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sysRoleTableService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSysRoleTableDto: UpdateSysRoleTableDto,
      @Request() req,
    ) {
      return this.sysRoleTableService.update(+id, updateSysRoleTableDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sysRoleTableService.remove(+id);
    }

  }
    