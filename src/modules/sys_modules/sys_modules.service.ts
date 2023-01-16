/* eslint-disable prettier/prettier */
import { SysRoleModule } from 'src/modules/sys_role_module/sys_role_module.model';

import { SysMenuPriviledge } from 'src/modules/sys_menu_priviledge/sys_menu_priviledge.model';

import { SysUserModule } from 'src/modules/sys_user_module/sys_user_module.model';

import { SysMenus } from 'src/modules/sys_menus/sys_menus.model';
import slugify from 'slugify';

import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysModules } from './sys_modules.model';
import { CreateSysModulesDto } from './dto/create-sys_modules.dto';
import { UpdateSysModulesDto } from './dto/update-sys_modules.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
@Injectable()
export class SysModulesService {
  constructor(
    @InjectModel(SysModules)
    private sys_modules: typeof SysModules,
    @InjectModel(SysRoleTable)
    private role_table: typeof SysRoleTable,
    @InjectModel(SysTables)
    private sysTables: typeof SysTables,
    private helpers: HelpersService,
  ) {}
  async create(createSysModulesDto: CreateSysModulesDto, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_modules' },
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
    const module_dto = createSysModulesDto;
    module_dto.module_url = slugify(createSysModulesDto.module_name);
    const response = await this.sys_modules.create({
      ...module_dto,
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
      where: { table_name: 'sys_modules' },
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
    const data = await this.sys_modules.findAndCountAll({
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
      // include: [{model:SysRoleModule,attributes: {
      //   exclude: [
      //     'is_active',
      //     'created_at',
      //     'created_by',
      //     'updated_at',
      //     'updated_by',
      //     'deleted_at',
      //   ],
      // },},{model:SysMenuPriviledge,attributes: {
      //   exclude: [
      //     'is_active',
      //     'created_at',
      //     'created_by',
      //     'updated_at',
      //     'updated_by',
      //     'deleted_at',
      //   ],
      // },},

      // ],
      where: condition,
      limit,
      offset,
    });

    const response = this.helpers.getPagingData(
      data,
      page,
      limit,
      'sys_modules',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_modules' },
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
    const response = await this.sys_modules.findOne({
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
          model: SysRoleModule,
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
          model: SysMenuPriviledge,
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
        //{ model: SysUserModule },
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
    updateSysModulesDto: UpdateSysModulesDto,
    payload: any,
  ) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_modules' },
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
    const response = await this.sys_modules.update(
      {
        ...updateSysModulesDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_modules' },
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
    const response = await this.sys_modules.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed!';
  }
}
