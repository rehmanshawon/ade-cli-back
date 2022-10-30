import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Users } from './users.model';
import { CreateUsersDto } from './dto/create-users.dto';
import { Posts } from '../posts/posts.model';
import { UpdateUsersDto } from './dto/updte-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private users: typeof Users,
    private helpers: HelpersService,
  ) {}
  create(createUsersDto: CreateUsersDto, payload: any) {
    return this.users.create({
      ...createUsersDto,
      created_at: sequelize.fn('NOW'),
      created_by: payload.sub,
    });
  }

  async findAll(page: number, size: number, field: string, search: string) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` } }
      : null;
    const { limit, offset } = this.helpers.getPagination(page, size);
    const data = await this.users.findAndCountAll({
      attributes: { exclude: ['password'] },
      order: [['user_id', 'DESC']],
      include: [{ model: Posts }],
      where: condition,
      limit,
      offset,
    });
    const response = this.helpers.getPagingData(data, page, limit);
    return response;
  }

  findOne(id: number) {
    return this.users.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUsersDto: UpdateUsersDto, payload: any) {
    const result = await this.users.update(
      {
        ...updateUsersDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return result;
  }

  async remove(id: number) {
    return await this.users.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
  }
}
