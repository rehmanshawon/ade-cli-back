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
import { SysUsersService } from './sys_users.service';
import { CreateSysUsersDto } from './dto/create-sys_users.dto';
import { UpdateSysUsersDto } from './dto/update-sys_users.dto';

@Controller('sys_users')
export class SysUsersController {
  constructor(private readonly sysUsersService: SysUsersService) {}

  @Post()
  create(@Body() createSysUsersDto: CreateSysUsersDto) {
    return this.sysUsersService.create(createSysUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const {
      attributes,
      includes,
      iattributes,
      isDropDown,
      page,
      size,
      field,
      search,
    } = req.query;

    return await this.sysUsersService.findAll(
      attributes,
      includes,
      iattributes,
      isDropDown,
      page,
      size,
      field,
      search,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysUsersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSysUsersDto: UpdateSysUsersDto,
    @Request() req,
  ) {
    return this.sysUsersService.update(+id, updateSysUsersDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysUsersService.remove(+id);
  }
}
