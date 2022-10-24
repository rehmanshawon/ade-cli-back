/* eslint-disable prettier/prettier */
import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/sys-auth/jwt-auth.guard';
import { CreateTableService } from './create-table.service';
import { CreateTableDto } from './dto/create-table.dto';

@Controller('create-table')
export class CreateTableController {
    constructor(private createTableService: CreateTableService){}
    @UseGuards(JwtAuthGuard)
    @Post()
    async createTable(@Body() table:CreateTableDto){

        return await this.createTableService.createTable(table);
    }
}
