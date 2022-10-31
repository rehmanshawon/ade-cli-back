/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysTypesController } from './sys_types.controller';
import { SysTypesService } from './sys_types.service';
import { SysTypes } from './sys_types.model';

@Module({
  imports: [SequelizeModule.forFeature([SysTypes]), HelpersModule],
  providers: [SysTypesService],
  controllers: [SysTypesController],
})
export class SysTypesModule {}
    