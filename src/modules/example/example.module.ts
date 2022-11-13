/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { Example } from './example.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Example, SysRoleTable, SysTables]), HelpersModule],
  providers: [ExampleService],
  controllers: [ExampleController],
})
export class ExampleModule {}
    