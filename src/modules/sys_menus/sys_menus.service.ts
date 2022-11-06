/* eslint-disable prettier/prettier */
import { SysRoleMenu } from 'src/modules/sys_role_menu/sys_role_menu.model';

import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
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
  async create(createSysMenusDto: CreateSysMenusDto, payload: any) {
    try {
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
      const response = await this.sys_menus.create({
        ...createSysMenusDto,
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
        order: [['id', 'ASC']],
        include: [{ model: SysRoleMenu }, { model: SysModules }],
        where: condition,
        limit,
        offset,
      });
      const temp = data.rows.map((m) => m.get({ plain: true }));
      const result = this.treeData(temp);
      // const menus = [];
      // for (let i = 0; i < data.rows.length; i++) {
      //   const children = [];
      //   for (let j = 0; j < data.rows.length; j++) {
      //     if (data.rows[i].id === data.rows[j].parent_menu)
      //       children.push(data.rows[j].get());
      //   }
      //   const menu = data.rows[i].get();
      //   menu['children'] = children;
      //   if (children) menus.push(menu);
      // }
      // data['rows'] = menus;
      data['rows'] = result;

      const response = this.helpers.getPagingData(
        data,
        page,
        limit,
        'sys_menus',
      );

      return response;
    } catch (err) {
      throw err;
    }
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

  async update(id: number, updateSysMenusDto: UpdateSysMenusDto, payload: any) {
    try {
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
      const response = await this.sys_menus.update(
        {
          ...updateSysMenusDto,
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

  treeData = (items: any[], id = 0, link = 'parent_menu') =>
    items
      .filter((item) => item[link] == id)
      .map((item) => ({
        ...item,
        id: +item.id,
        children: this.treeData(items, item.id),
      }));
}
