/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Posts } from './posts.model';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { Users } from 'src/modules/users/users.model';
import { Category } from 'src/modules/category/category.model';
@Injectable()
      export class PostsService {
        constructor(
          @InjectModel(Posts)
          private posts: typeof Posts,
          private helpers: HelpersService,
        ) {}
        create(createPostsDto: CreatePostsDto, payload: any) {
          return this.posts.create({
            ...createPostsDto,
            created_at: sequelize.fn('NOW'),
            created_by: payload.sub,
          });
        }

    async findAll(page: number, size: number, field: string, search: string) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` } }
        : null;
      const { limit, offset } = this.helpers.getPagination(page, size);
      const data = await this.posts.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [{model:Users},{model:Category}],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit);
      return response;
    }

    findOne(id: number) {
      return this.posts.findOne({
        where: {
          id,
        },
        include: [{model:Users},{model:Category}],
      });
    }

  async update(id: number, updatePostsDto: UpdatePostsDto,payload: any) {
    const result = await this.posts.update(
      { 
        ...updatePostsDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
       },
      { where: { id }, returning: true },
    );

    return result;
  }

  async remove(id: number) {
    return await this.posts.update(
      {
          is_active: 0,
          deleted_at: sequelize.fn('NOW'),
        },
        { where: { id } },
      );
    }
  }
  
