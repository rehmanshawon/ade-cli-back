/* eslint-disable prettier/prettier */
import {Rashed} from 'src/modules/rashed/rashed.model';

import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { RoleTest } from './role_test.model';
import { CreateRoleTestDto } from './dto/create-role_test.dto';
import { UpdateRoleTestDto } from './dto/update-role_test.dto';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysRoles } from '../sys_roles/sys_roles.model';
import { SysUsers } from '../sys_users/sys_users.model';
import { SysTables } from '../sys_tables/sys_tables.model';
@Injectable()
export class RoleTestService {
  constructor(
    @InjectModel(RoleTest)
    private role_test: typeof RoleTest,
    @InjectModel(SysRoleTable) private role_table: typeof SysRoleTable,
    @InjectModel(SysTables) private sysTables: typeof SysTables,
    private helpers: HelpersService,
  ) {}
  async create(createRoleTestDto: CreateRoleTestDto, payload: any) {
    try {
      const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'role_test' },
      });
      if (!thisTableInfo) throw new ForbiddenException();
      const canCreate = await this.role_table.findOne({
        where: {
          role_id: payload.role,
          table_id: thisTableInfo.id,
          access_type: 'All' || 'Create',
        },
      });
      if (!canCreate) throw new UnauthorizedException();
      const response = await this.role_test.create({
        ...createRoleTestDto,
        created_at: sequelize.fn('NOW'),
        created_by: payload.sub,
      });
      return response;
    } catch (err) {
      throw err;
    }
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
    try {
      const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'role_test' },
      });
      if (!thisTableInfo) throw new ForbiddenException();
      const canRead = await this.role_table.findOne({
        where: {
          role_id: payload.role,
          table_id: thisTableInfo.id,
          access_type: 'All' || 'Read',
        },
      });
      if (!canRead) throw new UnauthorizedException();
      const data = await this.role_test.findAndCountAll({
        order: [['id', 'DESC']],
        include: [{model:Rashed},],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(
        data,
        page,
        limit,
        'role_test',
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number, payload: any) {
    try {
      const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'role_test' },
      });
      if (!thisTableInfo) throw new ForbiddenException();
      const canRead = await this.role_table.findOne({
        where: {
          role_id: payload.role,
          table_id: thisTableInfo.id,
          access_type: 'All' || 'Read',
        },
      });
      if (!canRead) throw new UnauthorizedException();
      const response = await this.role_test.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [{model:Rashed},],
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateRoleTestDto: UpdateRoleTestDto, payload: any) {
    try {
      const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'role_test' },
      });
      if (!thisTableInfo) throw new ForbiddenException();
      const canUpdate = await this.role_table.findOne({
        where: {
          role_id: payload.role,
          table_id: thisTableInfo.id,
          access_type: 'All' || 'Update',
        },
      });
      if (!canUpdate) throw new UnauthorizedException();
      const response = await this.role_test.update(
        {
          ...updateRoleTestDto,
          updated_at: sequelize.fn('NOW'),
          updated_by: payload.sub,
        },
        { where: { id }, returning: true },
      );

      return response;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number, payload: any) {
    try {
      const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'role_test' },
      });
      if (!thisTableInfo) throw new ForbiddenException();
      const canDelete = await this.role_table.findOne({
        where: {
          role_id: payload.role,
          table_id: thisTableInfo.id,
          access_type: 'All' || 'Delete',
        },
      });
      if (!canDelete) throw new UnauthorizedException();
      const response = await this.role_test.update(
        {
          is_active: 0,
          deleted_at: sequelize.fn('NOW'),
        },
        { where: { id } },
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
}
