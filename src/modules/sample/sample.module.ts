/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { Sample } from './sample.model';

@Module({
  imports: [SequelizeModule.forFeature([Sample]), HelpersModule],
  providers: [SampleService],
  controllers: [SampleController],
})
export class SampleModule {}
    