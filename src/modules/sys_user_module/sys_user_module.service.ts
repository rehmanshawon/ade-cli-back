/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysUserModule } from './sys_user_module.model';
import { CreateSysUserModuleDto } from './dto/create-sys_user_module.dto';
import { UpdateSysUserModuleDto } from './dto/update-sys_user_module.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysUsers } from 'src/modules/sys_users/sys_users.model';
import { SysModules } from 'src/modules/sys_modules/sys_modules.model';
@Injectable()
export class SysUserModuleService {
  constructor(
    @InjectModel(SysUserModule)
    private sys_user_module: typeof SysUserModule,
    @InjectModel(SysRoleTable)
    private role_table: typeof SysRoleTable,
    @InjectModel(SysTables)
    private sysTables: typeof SysTables,
    private helpers: HelpersService,
  ) {}
  async create(createSysUserModuleDto: CreateSysUserModuleDto, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_user_module' },
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
    const response = await this.sys_user_module.create({
      ...createSysUserModuleDto,
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
      where: { table_name: 'sys_user_module' },
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
    const data = await this.sys_user_module.findAndCountAll({
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
          model: SysUsers,
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
          model: SysModules,
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
      'sys_user_module',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_user_module' },
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
    const response = await this.sys_user_module.findOne({
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
          model: SysUsers,
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
          model: SysModules,
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
    updateSysUserModuleDto: UpdateSysUserModuleDto,
    payload: any,
  ) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_user_module' },
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
    const response = await this.sys_user_module.update(
      {
        ...updateSysUserModuleDto,
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_user_module' },
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
    const response = await this.sys_user_module.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed!';
  }
}
