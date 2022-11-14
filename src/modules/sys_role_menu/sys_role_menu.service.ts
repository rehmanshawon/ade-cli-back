/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysRoleMenu } from './sys_role_menu.model';
import { CreateSysRoleMenuDto } from './dto/create-sys_role_menu.dto';
import { UpdateSysRoleMenuDto } from './dto/update-sys_role_menu.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';
import { SysMenus } from 'src/modules/sys_menus/sys_menus.model';
import { BulkCreateSysRoleMenuDto } from './dto/bulk-create-sys_role_menu.dto';
@Injectable()
export class SysRoleMenuService {
  constructor(
    @InjectModel(SysRoleMenu)
    private sys_role_menu: typeof SysRoleMenu,
    @InjectModel(SysRoleTable)
    private role_table: typeof SysRoleTable,
    @InjectModel(SysTables)
    private sysTables: typeof SysTables,
    private helpers: HelpersService,
  ) {}
  async create(createSysRoleMenuDto: CreateSysRoleMenuDto, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_role_menu' },
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
    const response = await this.sys_role_menu.create({
      ...createSysRoleMenuDto,
      created_by: payload.sub,
    });
    return 'data added!';
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

    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_role_menu' },
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
    const data = await this.sys_role_menu.findAndCountAll({
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
          model: SysMenus,
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
      'sys_role_menu',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_role_menu' },
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
    const response = await this.sys_role_menu.findOne({
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
          model: SysMenus,
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
    updateSysRoleMenuDto: UpdateSysRoleMenuDto,
    payload: any,
  ) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_role_menu' },
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
    const response = await this.sys_role_menu.update(
      {
        ...updateSysRoleMenuDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async bulkUpdate(
    bulkCreateSysRoleMenuDto: BulkCreateSysRoleMenuDto,
    payload: any,
  ) {
    // console.log(bulkCreateSysRoleMenuDto);
    const response = await this.sys_role_menu.update(
      {
        accessible: bulkCreateSysRoleMenuDto.accessible,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      {
        where: {
          role_id: bulkCreateSysRoleMenuDto.role_id,
          menu_id: bulkCreateSysRoleMenuDto.menus,
        },
        returning: true,
      },
    );
    return 'all data updated!';
  }

  async remove(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_role_menu' },
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
    const response = await this.sys_role_menu.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed';
  }
}
