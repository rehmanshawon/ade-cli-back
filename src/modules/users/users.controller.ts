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

import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { JwtAuthGuard } from '../sys-auth/jwt-auth.guard';

@Controller('nusers')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUsersDto: CreateUsersDto, @Request() req) {
    return this.usersService.create(createUsersDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.usersService.findAll(page, size, field, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleDto: any) {
    return this.usersService.update(+id, updateSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
