/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Res,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/sys-auth/jwt-auth.guard';
import { CreateTableService } from './create-table.service';
import { CreateTableDto } from './dto/create-table.dto';

@Controller('masterdata')
export class CreateTableController {
  constructor(private createTableService: CreateTableService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTable(@Body() table: CreateTableDto, @Request() req) {
    const { name, email, sub, role } = req.user;
    if (role !== 1) {
      throw new ForbiddenException();
    }
    await this.createTableService.createTable(table, req.user);

    const association = await this.createTableService.createModel(table);
    if (table.createCrud) {
      const result = await this.createTableService.createUserModule(
        table,
        association as string[],
      );
    }
    return association;
  }
}
