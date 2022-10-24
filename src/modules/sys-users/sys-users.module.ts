/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SysUser } from './models/sys-users.model';
import { UsersController } from './sys-users.controller';
import { UsersService } from './sys-users.service';

@Module({
    imports: [SequelizeModule.forFeature([SysUser])],
    providers: [UsersService],
  controllers: [UsersController],
    // export it to use it outside this module
    exports: [SequelizeModule, UsersService],
})
export class UserModule {}
