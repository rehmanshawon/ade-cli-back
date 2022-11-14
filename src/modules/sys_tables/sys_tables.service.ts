/* eslint-disable prettier/prettier */
import { SysRoleTable } from 'src/modules/sys_role_table/sys_role_table.model';

import { SysAttributes } from 'src/modules/sys_attributes/sys_attributes.model';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysTables } from './sys_tables.model';
import { CreateSysTablesDto } from './dto/create-sys_tables.dto';
import { UpdateSysTablesDto } from './dto/update-sys_tables.dto';
@Injectable()
export class SysTablesService {
  constructor(
    @InjectModel(SysTables)
    private sys_tables: typeof SysTables,
    private helpers: HelpersService,
  ) {}
  async create(createSysTablesDto: CreateSysTablesDto, payload: any) {
    const response = await this.sys_tables.create({
      ...createSysTablesDto,
      created_by: payload.sub,
    });
    return response || {};
  }

  async findAll(
    page: number,
    size: number,
    field: string,
    search: string,
    payload: any,
  ) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` }, is_active: 1 }
      : { is_active: 1 };
    const { limit, offset } = this.helpers.getPagination(page, size);

    const data = await this.sys_tables.findAndCountAll({
      order: [['id', 'DESC']],
      where: condition,
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
      limit,
      offset,
    });
    const response = this.helpers.getPagingData(
      data,
      page,
      limit,
      'sys_tables',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    const response = await this.sys_tables.findOne({
      where: {
        id,
        is_active: 1,
      },
      include: [
        //{ model: SysRoleTable },
        {
          model: SysAttributes,
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
    updateSysTablesDto: UpdateSysTablesDto,
    payload: any,
  ) {
    const response = await this.sys_tables.update(
      {
        ...updateSysTablesDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number, payload: any) {
    const response = await this.sys_tables.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed!';
  }
}
