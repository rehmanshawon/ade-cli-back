/* eslint-disable prettier/prettier */
import { SysRoleMenu } from 'src/modules/sys_role_menu/sys_role_menu.model';

import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysMenus } from './sys_menus.model';
import { CreateSysMenusDto } from './dto/create-sys_menus.dto';
import { UpdateSysMenusDto } from './dto/update-sys_menus.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysModules } from 'src/modules/sys_modules/sys_modules.model';
import { SingleUpdateSysMenusDto } from './dto/bulk-update-sys_menus.dto';

@Injectable()
export class SysMenusService {
  constructor(
    @InjectModel(SysMenus)
    private sys_menus: typeof SysMenus,
    @InjectModel(SysRoleTable)
    private role_table: typeof SysRoleTable,
    @InjectModel(SysTables)
    private sysTables: typeof SysTables,
    private helpers: HelpersService,
  ) {}

  private somearray = [
    {
      id: 1,
      menu_name: 'Dashboard',
      menu_url: 'dashboard',
      menu_icon_url: '/media/svg/icons/Layout/Layout-arrange.svg',
      menu_order: 0,
      parent_menu: 0,
      module_id: 4,
      children: [
        {
          id: 3,
          menu_name: 'Dashboard - b2b',
          menu_url: 'dashboard/b2b',
          menu_icon_url: null,
          menu_order: 0,
          parent_menu: 1,
          module_id: 4,
          children: [],
        },
        {
          id: 5,
          menu_name: 'User Role Wise Features',
          menu_url: 'user-setting/user-feature',
          menu_icon_url: null,
          menu_order: 0,
          parent_menu: 4,
          module_id: 4,
          children: [],
        },
      ],
    },
    {
      id: 4,
      menu_name: 'User Setting',
      menu_url: null,
      menu_icon_url: '/media/svg/icons/Shopping/Settings.svg',
      menu_order: 1,
      parent_menu: 0,
      module_id: 4,
      children: [
        {
          id: 6,
          menu_name: 'Customer Add',
          menu_url: 'add',
          menu_icon_url: null,
          menu_order: 1,
          parent_menu: 4,
          module_id: 4,
          children: [],
        },
      ],
    },
    {
      id: 9,
      menu_name: 'Admin Settings',
      menu_url: '',
      menu_icon_url: '/media/svg/icons/General/Settings-2.svg',
      menu_order: 1,
      parent_menu: 0,
      module_id: 4,
      children: [
        {
          id: 10,
          menu_name: 'Modules',
          menu_url: 'admin-settings/modules',
          menu_icon_url: '',
          menu_order: 1,
          parent_menu: 9,
          module_id: 4,
          children: [],
        },
        {
          id: 11,
          menu_name: 'Menus',
          menu_url: 'admin-settings/menu-list',
          menu_icon_url: '',
          menu_order: 1,
          parent_menu: 9,
          module_id: 4,
          children: [],
        },
      ],
    },
    {
      id: 7,
      menu_name: 'Users',
      menu_url: '',
      menu_icon_url: '/media/svg/icons/Communication/Group.svg',
      menu_order: 1,
      parent_menu: 0,
      module_id: 4,
      children: [
        {
          id: 8,
          menu_name: 'User Roles',
          menu_url: 'users/user-roles',
          menu_icon_url: '',
          menu_order: 1,
          parent_menu: 7,
          module_id: 4,
          children: [],
        },
      ],
    },
  ];

  async create(createSysMenusDto: CreateSysMenusDto, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menus' },
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

    const existingMenus = await this.sys_menus.findAll({
      where: {
        module_id: createSysMenusDto.module_id,
        parent_menu: createSysMenusDto.parent_menu,
      },
    });
    if (existingMenus.length) {
      const response = await this.sys_menus.create({
        ...createSysMenusDto,
        menu_order: existingMenus[existingMenus.length - 1].menu_order + 1,
        created_at: sequelize.fn('NOW'),
        created_by: payload.sub,
      });
      return response;
    } else {
      const response = await this.sys_menus.create({
        ...createSysMenusDto,
        menu_order: 0,
        created_at: sequelize.fn('NOW'),
        created_by: payload.sub,
      });
      return response;
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

    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menus' },
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
    const data = await this.sys_menus.findAndCountAll({
      order: [['menu_order', 'ASC']],
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
      where: condition,
      limit,
      offset,
    });
    const temp = data.rows.map((m) => m.get({ plain: true }));
    const result = this.helpers.treeData(temp);
    data['rows'] = result;
    const response = this.helpers.getPagingData(data, page, limit, 'sys_menus');
    return response;
  }

  async findOne(id: number, payload: any) {
    try {
      const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'sys_menus' },
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
      const response = await this.sys_menus.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [{ model: SysRoleMenu }, { model: SysModules }],
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async findByModuleAndParentId(mid: number, pid: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menus' },
    });
    if (!thisTableInfo)
      throw new ForbiddenException("You don't have CRUD access to this table!");
    const canRead = await this.role_table.findOne({
      where: {
        role_id: payload.role,
        table_id: thisTableInfo.id,
        access_type: 'All' || 'Read',
      },
    });
    if (!canRead)
      throw new UnauthorizedException(
        "You don't have read access to this table!",
      );
    const data = await this.sys_menus.findAndCountAll({
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
        module_id: mid,
        parent_menu: pid,
        is_active: 1,
      },
      //include: [{ model: SysRoleMenu }, { model: SysModules }],
    });
    const { limit, offset } = this.helpers.getPagination(0, 1000);
    const response = this.helpers.getPagingData(
      data,
      offset,
      limit,
      'sys_menus',
    );

    return response;
  }

  async update(id: number, updateSysMenusDto: UpdateSysMenusDto, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menus' },
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
    const data = await this.sys_menus.update(
      {
        ...updateSysMenusDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    const { limit, offset } = this.helpers.getPagination(0, 1000);
    const response = this.helpers.getPagingData(
      data,
      offset,
      limit,
      'sys_menus',
    );

    return response;
  }

  async bulkUpdate(
    bulkUpdateSysMenusDto: SingleUpdateSysMenusDto[],
    payload: any,
  ) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menus' },
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
    const statements = [];
    const tableName = 'sys_menus';
    const flattenedMenus = this.helpers.getMembers(bulkUpdateSysMenusDto);
    console.log(flattenedMenus);
    for (let i = 0; i < flattenedMenus.length; i++) {
      statements.push(
        this.sys_menus.sequelize.query(
          `UPDATE ${tableName} 
      SET menu_order=${flattenedMenus[i].menu_order},
      parent_menu=${flattenedMenus[i].parent_menu} 
      WHERE id=${flattenedMenus[i].id};`,
        ),
      );
    }
    const result = await Promise.all(statements);
    return result;
  }

  async remove(id: number, payload: any) {
    try {
      const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'sys_menus' },
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
      const response = await this.sys_menus.update(
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
