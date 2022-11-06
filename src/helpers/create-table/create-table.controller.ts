/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/sys-auth/jwt-auth.guard';
import { CreateTableService } from './create-table.service';
import { CreateTableDto } from './dto/create-table.dto';

@Controller('create-table')
export class CreateTableController {
  constructor(private createTableService: CreateTableService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTable(@Body() table: CreateTableDto, @Request() req) {
    await this.createTableService.createTable(table, req.user);

    const association = await this.createTableService.createModel(table);

    const result = await this.createTableService.createUserModule(
      table,
      association as string[],
    );
    return association;
  }
}
