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
import { SysRoleMenuService } from './sys_role_menu.service';
import { CreateSysRoleMenuDto } from './dto/create-sys_role_menu.dto';
import { UpdateSysRoleMenuDto } from './dto/update-sys_role_menu.dto';
import { BulkCreateSysRoleMenuDto } from './dto/bulk-create-sys_role_menu.dto';

@Controller('sys_role_menu')
export class SysRoleMenuController {
  constructor(private readonly sysRoleMenuService: SysRoleMenuService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSysRoleMenuDto: CreateSysRoleMenuDto, @Request() req) {
    return this.sysRoleMenuService.create(createSysRoleMenuDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.sysRoleMenuService.findAll(
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
    return this.sysRoleMenuService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSysRoleMenuDto: UpdateSysRoleMenuDto,
    @Request() req,
  ) {
    return this.sysRoleMenuService.update(+id, updateSysRoleMenuDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async bulkUpdate(
    @Body() bulkCreateSysRoleMenuDto: BulkCreateSysRoleMenuDto,
    @Request() req,
  ) {
    // console.log(bulkCreateSysRoleMenuDto);
    return await this.sysRoleMenuService.bulkUpdate(
      bulkCreateSysRoleMenuDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.sysRoleMenuService.remove(+id, req.user);
  }
}
