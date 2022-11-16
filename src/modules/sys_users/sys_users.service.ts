/* eslint-disable prettier/prettier */
import { SysUserModule } from 'src/modules/sys_user_module/sys_user_module.model';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysUsers } from './sys_users.model';
import { CreateSysUsersDto } from './dto/create-sys_users.dto';
import { UpdateSysUsersDto } from './dto/update-sys_users.dto';
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';
@Injectable()
export class SysUsersService {
  constructor(
    @InjectModel(SysUsers)
    private sys_users: typeof SysUsers,
    private helpers: HelpersService,
  ) {}
  async create(createSysUsersDto: CreateSysUsersDto): Promise<SysUsers> {
    const response = await this.sys_users.create({
      ...createSysUsersDto,
    });
    // return {
    //   error: false,
    //   statusCode: 201,
    //   message: 'record created successfully!',
    //   data: response,
    // };
    return response;
  }

  async findAll(page: number, size: number, field: string, search: string) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` }, is_active: 1 }
      : { is_active: 1 };
    const { limit, offset } = this.helpers.getPagination(page, size);

    const data = await this.sys_users.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: {
        exclude: [
          'password',
          'is_active',
          'created_at',
          'created_by',
          'updated_at',
          'updated_by',
          'deleted_at',
        ],
      },
      include: [
        {
          model: SysRoles,
          attributes: {
            exclude: [
              'id',
              'is_active',
              'created_at',
              'created_by',
              'updated_at',
              'updated_by',
              'deleted_at',
            ],
          },
        },
      ],
      where: condition,
      limit,
      offset,
    });
    const response = this.helpers.getPagingData(data, page, limit, 'sys_users');
    return response || {};
  }

  async findOne(id: number) {
    const response = await this.sys_users.findOne({
      attributes: {
        exclude: [
          'password',
          'is_active',
          'created_at',
          'created_by',
          'updated_at',
          'updated_by',
          'deleted_at',
        ],
      },
      where: {
        id,
        is_active: 1,
      },
      include: [
        // { model: SysUserModule },
        {
          model: SysRoles,
          attributes: {
            exclude: [
              'id',
              'is_active',
              'created_at',
              'created_by',
              'updated_at',
              'updated_by',
              'deleted_at',
            ],
          },
        },
      ],
    });

    return response || {};
  }

  async findOneByEmail(email: string): Promise<SysUsers> {
    const response = await this.sys_users.findOne({
      attributes: {
        exclude: [
          'is_active',
          'created_at',
          'created_by',
          'updated_at',
          'updated_by',
          'deleted_at',
        ],
      },
      where: {
        email,
        is_active: 1,
      },
      include: [
        {
          model: SysRoles,
          attributes: {
            exclude: [
              'id',
              'is_active',
              'created_at',
              'created_by',
              'updated_at',
              'updated_by',
              'deleted_at',
            ],
          },
        },
      ],
    });
    console.log(response);
    return response || ({} as SysUsers);
  }

  async update(id: number, updateSysUsersDto: UpdateSysUsersDto, payload: any) {
    const response = await this.sys_users.update(
      {
        ...updateSysUsersDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number) {
    const response = await this.sys_users.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );

    return 'data removed!';
  }
}
