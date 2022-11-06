/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ShoesController } from './shoes.controller';
import { ShoesService } from './shoes.service';
import { Shoes } from './shoes.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Shoes, SysRoleTable, SysTables]), HelpersModule],
  providers: [ShoesService],
  controllers: [ShoesController],
})
export class ShoesModule {}
    