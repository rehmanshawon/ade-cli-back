/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysMasters } from './sys_masters.model';
import { CreateSysMastersDto } from './dto/create-sys_masters.dto';
import { UpdateSysMastersDto } from './dto/update-sys_masters.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
@Injectable()
export class SysMastersService {
  constructor(
    @InjectModel(SysMasters)
    private sys_masters: typeof SysMasters,
    @InjectModel(SysRoleTable)
    private role_table: typeof SysRoleTable,
    @InjectModel(SysTables)
    private sysTables: typeof SysTables,
    private helpers: HelpersService,
  ) {}
  async create(createSysMastersDto: CreateSysMastersDto, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_masters', is_active: true },
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

    const response = await this.sys_masters.create({
      ...createSysMastersDto,
      grid_params: JSON.stringify(createSysMastersDto.query_tables),
      created_by: payload.sub,
    });
    return 'one sys_master added!';
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
      where: { table_name: 'sys_masters', is_active: true },
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
    const data = await this.sys_masters.findAndCountAll({
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
      include: [],
      where: condition,
      limit,
      offset,
    });
    const response = this.helpers.getPagingData(
      data,
      page,
      limit,
      'sys_masters',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_masters,is_active:true,' },
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
    const response = await this.sys_masters.findOne({
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
      include: [],
    });
    return response || {};
  }

  async update(
    id: number,
    updateSysMastersDto: UpdateSysMastersDto,
    payload: any,
  ) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_masters', is_active: true },
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
    const response = await this.sys_masters.update(
      {
        ...updateSysMastersDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'sys_masters updated!';
  }

  async remove(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_masters', is_active: true },
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
    const response = await this.sys_masters.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'one record deleted from sys_masters!';
  }
}
