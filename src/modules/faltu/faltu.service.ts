/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Faltu } from './faltu.model';
import { CreateFaltuDto } from './dto/create-faltu.dto';
import { UpdateFaltuDto } from './dto/update-faltu.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
@Injectable()
export class FaltuService {
  constructor(
    @InjectModel(Faltu)
    private faltu: typeof Faltu,
    @InjectModel(SysRoleTable)
    private role_table: typeof SysRoleTable,
    @InjectModel(SysTables)
    private sysTables: typeof SysTables,
    private helpers: HelpersService,
  ) {}
  async create(createFaltuDto: CreateFaltuDto, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'faltu', is_active: true },
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
    const response = await this.faltu.create({
      ...createFaltuDto,
      created_by: payload.sub,
    });
    return 'one faltu added!';
  }

  async findAll(
    attributes: string,
    includes: string,
    iattributes: string,
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
    //const modelIncludes = JSON.parse(includes);
    // const attributesInclude = JSON.parse(iattributes);
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'faltu', is_active: true },
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
    const data = await this.faltu.findAndCountAll({
      order: [['id', 'DESC']],
      // attributes: JSON.parse(attributes) || [],
      // include: [],
      where: condition,
      limit,
      offset,
    });
    const count = data.count;
    const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }), 'faltu'),
    );
    const response = this.helpers.getPagingData(
      { count: count, rows: plain },
      page,
      limit,
      'faltu',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'faltu,is_active:true,' },
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
    const response = await this.faltu.findOne({
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

  async update(id: number, updateFaltuDto: UpdateFaltuDto, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'faltu', is_active: true },
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
    const response = await this.faltu.update(
      {
        ...updateFaltuDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'faltu updated!';
  }

  async remove(id: number, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'faltu', is_active: true },
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
    const response = await this.faltu.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'one record deleted from faltu!';
  }
}
