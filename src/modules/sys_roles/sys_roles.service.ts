/* eslint-disable prettier/prettier */
import { SysRoleMenu } from 'src/modules/sys_role_menu/sys_role_menu.model';

import { SysRoleTable } from 'src/modules/sys_role_table/sys_role_table.model';

import { SysUsers } from 'src/modules/sys_users/sys_users.model';

import {
  ForbiddenException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysRoles } from './sys_roles.model';
import { CreateSysRolesDto } from './dto/create-sys_roles.dto';
import { UpdateSysRolesDto } from './dto/update-sys_roles.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
@Injectable()
export class SysRolesService {
  constructor(
    @InjectModel(SysRoles)
    private sys_roles: typeof SysRoles,
    @InjectModel(SysRoleTable)
    private role_table: typeof SysRoleTable,
    @InjectModel(SysTables)
    private sysTables: typeof SysTables,
    private helpers: HelpersService,
  ) {}
  async create(createSysRolesDto: CreateSysRolesDto, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_roles' },
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
    const response = await this.sys_roles.create({
      ...createSysRolesDto,
      created_by: payload.sub,
    });
    return 'data added!';
  }

  async findAll(
    attributes: string,
    includes: string,
    iattributes: string,
    isDropDown = false,
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
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_roles' },
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
    const data = await this.sys_roles.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: attributes ? JSON.parse(attributes) : ['id', 'role_name'],
      include: [],
      where: condition,
      limit,
      offset,
    });
    const count = data.count;
    const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }), 'sys_roles'),
    );
    const response = this.helpers.getPagingData(
      isDropDown
        ? {
            count: data.count,
            rows: this.helpers.changeSpecificKeyOfObjectArray(
              data.rows.map((m) => m.get({ plain: true })),
              JSON.parse(attributes)[1],
              'label',
            ),
          }
        : { count: count, rows: plain },
      page,
      limit,
      'sys_roles',
    );
    return response || {};
    // return this.helpers.changeSpecificKeyOfObjectArray(
    //   data.rows.map((m) => m.get({ plain: true })),
    //   JSON.parse(attributes)[1],
    //   'label',
    // );
  }

  async findOne(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_roles' },
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
    const response = await this.sys_roles.findOne({
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
        // { model: SysRoleMenu },
        // { model: SysRoleTable },
        {
          model: SysUsers,
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
        },
      ],
    });
    return response || {};
  }

  async update(id: number, updateSysRolesDto: UpdateSysRolesDto, payload: any) {
    const response = await this.sys_roles.update(
      {
        ...updateSysRolesDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number, payload: any) {
    const response = await this.sys_roles.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed!';
  }
}
