/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { Sample3Controller } from './sample3.controller';
import { Sample3Service } from './sample3.service';
import { Sample3 } from './sample3.model';

@Module({
  imports: [SequelizeModule.forFeature([Sample3]), HelpersModule],
  providers: [Sample3Service],
  controllers: [Sample3Controller],
})
export class Sample3Module {}
    