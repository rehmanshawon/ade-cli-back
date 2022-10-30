import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([Users]), HelpersModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
