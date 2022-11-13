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
import { HelpersService } from '../helpers/helpers.service';
import { MDCreateTableDto } from './dto/md-create-table.dto';
import { MasterDataService } from './masterdata.service';

@Controller('fazil')
export class MasterDataController {
  constructor(
    private masterDataService: MasterDataService,
    private helpers: HelpersService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTable(@Body() table: MDCreateTableDto, @Request() req) {
    const { name, email, sub, role } = req.user;
    if (role !== 1) {
      throw new ForbiddenException();
    }
    // await this.masterDataService.createTable(table, req.user);

    const association = await this.masterDataService.createModel(table);

    //Table1.sync().then(() => console.log('Sync complete'));

    // const result = await this.createTableService.createUserModule(
    //   table,
    //   association as string[],
    // );
    // return association;
  }

  async addModelToSelf(table: MDCreateTableDto) {
    const modelToAdd = await this.helpers.capitalizeFirstLetter(
      table.tableName,
    );
    const fileName = 'src/helpers/masterdata/masterdata.controller.ts';
    const modelPath = `src/modules/${await this.helpers.toSnakeCase(
      table.tableName,
    )}/${await this.helpers.toSnakeCase(table.tableName)}.model`;
    const importString = `import {${modelToAdd}} from '${modelPath}';\n`;
  }
}
