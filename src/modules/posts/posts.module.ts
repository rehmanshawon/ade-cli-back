/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Posts } from './posts.model';

@Module({
  imports: [SequelizeModule.forFeature([Posts]), HelpersModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
    