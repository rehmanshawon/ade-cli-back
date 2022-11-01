/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysTablesController } from './sys_tables.controller';
import { SysTablesService } from './sys_tables.service';
import { SysTables } from './sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([SysTables]), HelpersModule],
  providers: [SysTablesService],
  controllers: [SysTablesController],
})
export class SysTablesModule {}
    