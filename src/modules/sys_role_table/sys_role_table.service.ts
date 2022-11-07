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
    try {
      const response = await this.sys_role_table.create({
        ...createSysRoleTableDto,
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
      const data = await this.sys_role_table.findAndCountAll({
        order: [['id', 'DESC']],
        include: [{ model: SysRoles }, { model: SysTables }],
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
      const response = await this.sys_role_table.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [{ model: SysRoles }, { model: SysTables }],
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
    updateSysRoleTableDto: UpdateSysRoleTableDto,
    payload: any,
  ) {
    try {
      const response = await this.sys_role_table.update(
        {
          ...updateSysRoleTableDto,
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
      const response = await this.sys_role_table.update(
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
