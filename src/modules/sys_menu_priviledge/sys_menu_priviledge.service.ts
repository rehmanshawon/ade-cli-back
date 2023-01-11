/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysMenuPriviledge } from './sys_menu_priviledge.model';
import { CreateSysMenuPriviledgeDto } from './dto/create-sys_menu_priviledge.dto';
import { UpdateSysMenuPriviledgeDto } from './dto/update-sys_menu_priviledge.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysMenus } from 'src/modules/sys_menus/sys_menus.model';
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';
import { SysModules } from 'src/modules/sys_modules/sys_modules.model';
@Injectable()
export class SysMenuPriviledgeService {
  constructor(
    @InjectModel(SysMenuPriviledge)
    private sys_menu_priviledge: typeof SysMenuPriviledge,
    @InjectModel(SysRoleTable)
    private role_table: typeof SysRoleTable,
    @InjectModel(SysTables)
    private sysTables: typeof SysTables,
    @InjectModel(SysMenus)
    private sysMenus: typeof SysMenus,
    private helpers: HelpersService,
  ) {}
  async create(
    createSysMenuPriviledgeDto: CreateSysMenuPriviledgeDto[],
    payload: any,
  ) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menu_priviledge', is_active: true },
    });
    if (!thisTableInfo) throw new ForbiddenException();
    const canCreate = await this.role_table.findOne({
      where: {
        role_id: payload.role,
        table_id: thisTableInfo.id,
        access_type: 'All' || 'Create',
        is_active: true,
      },
    });
    if (!canCreate) throw new UnauthorizedException();
    await this.sys_menu_priviledge.destroy({
      where: {
        role_id: createSysMenuPriviledgeDto[0].role_id,
        module_id: createSysMenuPriviledgeDto[0].module_id,
      },
    });
    const priviledgeData = createSysMenuPriviledgeDto.map((obj) => ({
      ...obj,
      created_by: payload.sub,
    }));
    // const response = await this.sys_menu_priviledge.bulkCreate({
    //   ...createSysMenuPriviledgeDto,
    //   created_by: payload.sub,
    // });
    const response = await this.sys_menu_priviledge.bulkCreate(priviledgeData);
    return 'one sys_menu_priviledge added!';
  }

  async findMenusByRoleModule(
    role_id: number,
    module_id: number,
    payload: any,
  ) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menu_priviledge', is_active: true },
    });
    if (!thisTableInfo) throw new ForbiddenException();
    const canRead = await this.role_table.findOne({
      where: {
        role_id: payload.role,
        table_id: thisTableInfo.id,
        access_type: 'All' || 'Read',
        is_active: true,
      },
    });
    if (!canRead) throw new UnauthorizedException();
    const data = await this.sys_menu_priviledge.findAll({
      attributes: ['menu_id'],
      where: {
        role_id: role_id,
        module_id: module_id,
      },
    });
    const menus = await this.sysMenus.findAll({
      order: [['menu_order', 'ASC']],
      attributes: [
        'id',
        'menu_name',
        'menu_url',
        'menu_icon_url',
        'menu_order',
        'parent_menu',
      ],
    });
    const plainData = data
      .map((m) => m.get({ plain: true }))
      .map((m) => m.menu_id);
    console.log(plainData);
    const temp = menus
      .map((m) => m.get({ plain: true }))
      .map((obj) => {
        const allowed = plainData.includes(obj.id);
        console.log(allowed);
        return { ...obj, granted: allowed };
      });
    const menutree = this.helpers.treeData(temp);
    return menutree;
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
    const modelIncludes = includes ? JSON.parse(includes) : null;
    const attributesInclude = iattributes ? JSON.parse(iattributes) : null;
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menu_priviledge', is_active: true },
    });
    if (!thisTableInfo) throw new ForbiddenException();
    const canRead = await this.role_table.findOne({
      where: {
        role_id: payload.role,
        table_id: thisTableInfo.id,
        access_type: 'All' || 'Read',
        is_active: true,
      },
    });
    if (!canRead) throw new UnauthorizedException();
    const data = await this.sys_menu_priviledge.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: attributes ? JSON.parse(attributes) : null,
      include: [
        {
          model: SysMenus,
          attributes: attributesInclude
            ? attributesInclude[
                modelIncludes.indexOf(this.helpers.toSnakeCase('SysMenus'))
              ]
            : [],
        },
        {
          model: SysRoles,
          attributes: attributesInclude
            ? attributesInclude[
                modelIncludes.indexOf(this.helpers.toSnakeCase('SysRoles'))
              ]
            : [],
        },
        {
          model: SysModules,
          attributes: attributesInclude
            ? attributesInclude[
                modelIncludes.indexOf(this.helpers.toSnakeCase('SysModules'))
              ]
            : [],
        },
      ],
      where: condition,
      limit,
      offset,
    });
    const count = data.count;
    const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }), 'sys_menu_priviledge'),
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
      'sys_menu_priviledge',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menu_priviledge', is_active: true },
    });
    if (!thisTableInfo) throw new ForbiddenException();
    const canRead = await this.role_table.findOne({
      where: {
        role_id: payload.role,
        table_id: thisTableInfo.id,
        access_type: 'All' || 'Read',
        is_active: true,
      },
    });
    if (!canRead) throw new UnauthorizedException();
    const response = await this.sys_menu_priviledge.findOne({
      where: {
        id,
        is_active: 1,
      },
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
        { model: SysMenus, attributes: [] },
        { model: SysRoles, attributes: [] },
        { model: SysModules, attributes: [] },
      ],
    });
    return response || {};
  }

  async update(
    id: number,
    updateSysMenuPriviledgeDto: UpdateSysMenuPriviledgeDto,
    payload: any,
  ) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menu_priviledge', is_active: true },
    });
    if (!thisTableInfo) throw new ForbiddenException();
    const canUpdate = await this.role_table.findOne({
      where: {
        role_id: payload.role,
        table_id: thisTableInfo.id,
        access_type: 'All' || 'Update',
        is_active: true,
      },
    });
    if (!canUpdate) throw new UnauthorizedException();
    const response = await this.sys_menu_priviledge.update(
      {
        ...updateSysMenuPriviledgeDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'sys_menu_priviledge updated!';
  }

  async remove(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_menu_priviledge', is_active: true },
    });
    if (!thisTableInfo) throw new ForbiddenException();
    const canDelete = await this.role_table.findOne({
      where: {
        role_id: payload.role,
        table_id: thisTableInfo.id,
        access_type: 'All' || 'Delete',
        is_active: true,
      },
    });
    if (!canDelete) throw new UnauthorizedException();
    const response = await this.sys_menu_priviledge.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'one record deleted from sys_menu_priviledge!';
  }
}
