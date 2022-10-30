/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CreateTableService } from './create-table.service';
import { CreateTableController } from './create-table.controller';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [HelpersModule],
  providers: [CreateTableService],
  controllers: [CreateTableController],
})
export class CreateTableModule {}
