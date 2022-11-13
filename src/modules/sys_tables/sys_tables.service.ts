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
      created_at: sequelize.fn('NOW'),
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
      // include: [
      //   {
      //     model: SysAttributes,
      //     attributes: {
      //       exclude: [
      //         'is_active',
      //         'created_at',
      //         'created_by',
      //         'updated_at',
      //         'updated_by',
      //         'deleted_at',
      //       ],
      //     },
      //   },
      // ],
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
    return response;
  }

  async findOne(id: number, payload: any) {
    try {
      const response = await this.sys_tables.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [{ model: SysRoleTable }, { model: SysAttributes }],
      });
      return {
        error: false,
        statusCode: 200,
        message: 'Success!',
        data: response,
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    updateSysTablesDto: UpdateSysTablesDto,
    payload: any,
  ) {
    try {
      const response = await this.sys_tables.update(
        {
          ...updateSysTablesDto,
          updated_at: sequelize.fn('NOW'),
          updated_by: payload.sub,
        },
        { where: { id }, returning: true },
      );

      return {
        error: false,
        statusCode: 200,
        message: 'Update success!',
        data: response,
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number, payload: any) {
    try {
      const response = await this.sys_tables.update(
        {
          is_active: 0,
          deleted_at: sequelize.fn('NOW'),
        },
        { where: { id } },
      );
      return {
        error: false,
        statusCode: 200,
        message: 'Delete success!',
        data: response,
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
