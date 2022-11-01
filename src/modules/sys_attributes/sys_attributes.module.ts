/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysAttributesController } from './sys_attributes.controller';
import { SysAttributesService } from './sys_attributes.service';
import { SysAttributes } from './sys_attributes.model';

@Module({
  imports: [SequelizeModule.forFeature([SysAttributes]), HelpersModule],
  providers: [SysAttributesService],
  controllers: [SysAttributesController],
})
export class SysAttributesModule {}
    