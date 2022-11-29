/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './blog.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysTables } from '../sys_tables/sys_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Blog, SysRoleTable, SysTables]), HelpersModule],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
    