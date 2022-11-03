/* eslint-disable prettier/prettier */
import {SysRoleTable} from 'src/modules/sys_role_table/sys_role_table.model';

import { SysUsers } from 'src/modules/sys_users/sys_users.model';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysRoles } from './sys_roles.model';
import { CreateSysRolesDto } from './dto/create-sys_roles.dto';
import { UpdateSysRolesDto } from './dto/update-sys_roles.dto';
@Injectable()
export class SysRolesService {
  constructor(
    @InjectModel(SysRoles)
    private sys_roles: typeof SysRoles,
    private helpers: HelpersService,
  ) {}
  async create(createSysRolesDto: CreateSysRolesDto, payload: any) {
    try {
      const response = await this.sys_roles.create({
        ...createSysRolesDto,
        created_at: sequelize.fn('NOW'),
        created_by: payload.sub,
      });
      return {
        error: false,
        statusCode: 201,
        message: 'record created successfully!',
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

  async findAll(page: number, size: number, field: string, search: string) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` }, is_active: 1 }
      : { is_active: 1 };
    const { limit, offset } = this.helpers.getPagination(page, size);
    try {
      const data = await this.sys_roles.findAndCountAll({
        order: [['id', 'DESC']],
        include: [{model:SysRoleTable},{ model: SysUsers, attributes: { exclude: ['password'] } }],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(
        data,
        page,
        limit,
        'sys_roles',
      );
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

  async findOne(id: number) {
    try {
      const response = await this.sys_roles.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [{model:SysRoleTable},{ model: SysUsers, attributes: { exclude: ['password'] } }],
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

  async update(id: number, updateSysRolesDto: UpdateSysRolesDto, payload: any) {
    try {
      const response = await this.sys_roles.update(
        {
          ...updateSysRolesDto,
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

  async remove(id: number) {
    try {
      const response = await this.sys_roles.update(
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
