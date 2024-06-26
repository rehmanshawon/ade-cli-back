/* eslint-disable prettier/prettier */
import {
  Controller,
  Param,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Res,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import sequelize from 'sequelize';
//import { databaseProviders } from 'src/database.provider';
import { JwtAuthGuard } from 'src/modules/sys-auth/jwt-auth.guard';
import { SysMenus } from 'src/modules/sys_menus/sys_menus.model';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';
import { HelpersService } from '../helpers/helpers.service';
import { MDCreateTableDto } from './dto/md-create-table.dto';
import { MasterDataService } from './masterdata.service';

@Controller('masterdata')
export class MasterDataController {
  constructor(
    //@Inject(databaseProviders) private dbService,
    private masterDataService: MasterDataService,
    private helpers: HelpersService,
    @InjectModel(SysTables) private sysTables: typeof SysTables,
    @InjectModel(SysMenus) private sys_menus: typeof SysMenus,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTable(@Body() table: MDCreateTableDto, @Request() req) {
    const { name, email, sub, role } = req.user;
    if (role !== 1) {
      throw new ForbiddenException();
    }
    // await this.masterDataService.createTable(table, req.user);
    console.log(req.user);
    const association = await this.masterDataService.createModel(
      table,
      req.user,
    );
    if (table.createCrud) {
      const result = await this.masterDataService.createUserModule(
        table,
        association as string[],
      );
      return 'table with crud services created successfully!';
    }

    return 'table created successfully!';
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async getTables(@Request() req) {
    const response = await this.sysTables.sequelize
      .getQueryInterface()
      .showAllTables();
    return { tables: response } || {};
  }

  @Get(':id')
  async getMasterData(@Param('id') id: string, @Request() req) {
    const table = await this.sysTables.findOne({
      where: {
        id: +id,
        is_active: true,
      },
    });
    if (table.table_name === 'sys_menus') {
      return await this[`${table.table_name}`].findAll();
    }
    const response = await this.sysTables.sequelize
      .getQueryInterface()
      .showAllTables();
    return { tables: response } || {};
  }

  async addModelToSelf(table: MDCreateTableDto) {
    const modelToAdd = await this.helpers.capitalizeFirstLetter(
      table.tableName,
    );
    const fileName = 'src/helpers/masterdata/masterdata.controller.ts';
    const modelPath = `src/modules/${this.helpers.toSnakeCase(
      table.tableName,
    )}/${this.helpers.toSnakeCase(table.tableName)}.model`;
    const importString = `import {${modelToAdd}} from '${modelPath}';\n`;
    const fileAllReadyImported = this.helpers.checkFileForAString(
      fileName,
      importString,
    );
    if (!fileAllReadyImported) {
      await this.helpers.insertAtLine(fileName, 1, importString);
    }
    //this.dbService.model(modelToAdd).sync({ alter: true });
    //this.dbService.
  }
}
