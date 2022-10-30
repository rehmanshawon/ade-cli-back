import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Posts } from '../posts/posts.model';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './users.model';

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

  async findAll(page: Number, size: Number, field: string, search: string) {
    var condition = field
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

  update(id: number, updateSampleDto: any) {
    return `This action updates a #${id} sample`;
  }

  remove(id: number) {
    return `This action removes a #${id} sample`;
  }
}
