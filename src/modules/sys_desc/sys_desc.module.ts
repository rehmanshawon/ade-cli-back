/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysDescController } from './sys_desc.controller';
import { SysDescService } from './sys_desc.service';
import { SysDesc } from './sys_desc.model';

@Module({
  imports: [SequelizeModule.forFeature([SysDesc]), HelpersModule],
  providers: [SysDescService],
  controllers: [SysDescController],
})
export class SysDescModule {}
    