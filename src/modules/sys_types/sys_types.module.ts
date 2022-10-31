/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { Sys_typesController } from './sys_types.controller';
import { Sys_typesService } from './sys_types.service';
import { Sys_types } from './sys_types.model';

@Module({
  imports: [SequelizeModule.forFeature([Sys_types]), HelpersModule],
  providers: [Sys_typesService],
  controllers: [Sys_typesController],
})
export class Sys_typesModule {}
    