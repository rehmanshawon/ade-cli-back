/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CreateTableService } from './create-table.service';
import { CreateTableController } from './create-table.controller';

@Module({
  providers: [CreateTableService],
  controllers: [CreateTableController]
})
export class CreateTableModule {}
