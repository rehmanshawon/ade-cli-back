/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Department } from './department.model';

@Module({
  imports: [SequelizeModule.forFeature([Department]), HelpersModule],
  providers: [DepartmentService],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
    