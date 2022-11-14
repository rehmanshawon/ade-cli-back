/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysRoleTable } from './sys_role_table.model';
import { CreateSysRoleTableDto } from './dto/create-sys_role_table.dto';
import { UpdateSysRoleTableDto } from './dto/update-sys_role_table.dto';
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';

@Injectable()
export class SysRoleTableService {
  constructor(
    @InjectModel(SysRoleTable)
    private sys_role_table: typeof SysRoleTable,
    private helpers: HelpersService,
  ) {}
  async create(createSysRoleTableDto: CreateSysRoleTableDto, payload: any) {
    const response = await this.sys_role_table.create({
      ...createSysRoleTableDto,
      created_by: payload.sub,
    });
    return 'data added!';
  }

  async findAll(page: number, size: number, field: string, search: string) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` }, is_active: 1 }
      : { is_active: 1 };
    const { limit, offset } = this.helpers.getPagination(page, size);
    const data = await this.sys_role_table.findAndCountAll({
      order: [['id', 'DESC']],
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
      include: [
        {
          model: SysRoles,
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
        },
        {
          model: SysTables,
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
        },
      ],
      where: condition,
      limit,
      offset,
    });
    const response = this.helpers.getPagingData(
      data,
      page,
      limit,
      'sys_role_table',
    );
    return response || {};
  }

  async findOne(id: number) {
    const response = await this.sys_role_table.findOne({
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
        id,
        is_active: 1,
      },
      include: [
        {
          model: SysRoles,
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
        },
        {
          model: SysTables,
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
        },
      ],
    });
    return response || {};
  }

  async update(
    id: number,
    updateSysRoleTableDto: UpdateSysRoleTableDto,
    payload: any,
  ) {
    const response = await this.sys_role_table.update(
      {
        ...updateSysRoleTableDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number) {
    const response = await this.sys_role_table.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed!';
  }
}
