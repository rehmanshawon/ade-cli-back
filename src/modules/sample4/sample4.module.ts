/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { Sample4Controller } from './sample4.controller';
import { Sample4Service } from './sample4.service';
import { Sample4 } from './sample4.model';

@Module({
  imports: [SequelizeModule.forFeature([Sample4]), HelpersModule],
  providers: [Sample4Service],
  controllers: [Sample4Controller],
})
export class Sample4Module {}
    