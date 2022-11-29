/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { WriterController } from './writer.controller';
import { WriterService } from './writer.service';
import { Writer } from './writer.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Writer, SysRoleTable, SysTables]), HelpersModule],
  providers: [WriterService],
  controllers: [WriterController],
})
export class WriterModule {}
    