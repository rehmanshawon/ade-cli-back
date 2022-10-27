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
  async createTable(@Body() table: CreateTableDto, @Res() res: Response) {
    res.writeHead(200);
    res.write(`Creating table ${table.tableName}. Wait!`);

    const newTable: CreateTableDto = await this.createTableService.createTable(
      table,
    );
    res.write(`Create table ${table.tableName} done!`);
    // res.write(`Creating module ${table.tableName}. Wait!`);
    // const ModulePath: any = await this.createTableService.createUserModule(
    //   table,
    // );
    // res.write('Create module done');
    res.write(`Creating model ${table.tableName}. Wait!`);
    const modelPath: any = await this.createTableService.createModel(table);
    res.end('create model done');
    // const modelAdded: any = await this.createTableService.addModelToApp(
    //   table.tableName,
    // );
    // res.end('model added to app module');
    // const result: any = await this.createTableService.addModelToModule(
    //   table.tableName,
    // );
    // res.end('model added to Module');
  }
}
