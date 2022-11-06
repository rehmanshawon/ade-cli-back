/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { SysUsersController } from './sys_users.controller';
import { SysUsersService } from './sys_users.service';
import { SysUsers } from './sys_users.model';

@Module({
  imports: [SequelizeModule.forFeature([SysUsers]), HelpersModule],
  providers: [SysUsersService],
  controllers: [SysUsersController],
  exports: [SequelizeModule, SysUsersService],
})
export class SysUsersModule {}
