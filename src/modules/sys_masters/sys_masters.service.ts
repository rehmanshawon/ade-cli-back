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
    const tableAttributs = createSysMastersDto.query_tables[0].fieldList
      .filter((field) => field.include === true)
      .map((f) => f.fieldName);

    const tableColumns = createSysMastersDto.query_tables.map((f) =>
      f.fieldList
        .filter((field) => field.include === true)
        .map((f) => f.columnName),
    );

    const attributes = encodeURIComponent(JSON.stringify(tableAttributs));
    const foreignTables = encodeURIComponent(
      JSON.stringify(
        createSysMastersDto.query_tables.slice(1).map((f) => f.tableName),
      ),
    );
    //console.log(foreignTables);
    const foreignAttributes = encodeURIComponent(
      JSON.stringify(
        createSysMastersDto.query_tables
          .slice(1)
          .map((f) =>
            f.fieldList
              .filter((item) => item.include === true)
              .map((a) => a.fieldName),
          ),
      ),
    );
    // console.log(foreignAttributes);
    //const foreig
    //console.log(JSON.stringify(foreignTables[0].fieldList[0].));
    const gridUrl = `/api/v1/${createSysMastersDto.query_tables[0].tableName}?attributes=${attributes}&includes=${foreignTables}&iattributes=${foreignAttributes}`;
    const createUrl = `/api/v1/${createSysMastersDto.query_tables[0].tableName}`;

    // const queryString = decodeURIComponent(gridUrl.replace(/\+/g, ' ')).split(
    //   '?',
    // )[1];
    // const urlParams = new URLSearchParams(queryString);

    // console.log(
    //   urlParams.get('attributes'),
    //   urlParams.get('includes'),
    //   urlParams.get('iattributes'),
    // );

    const dto = createSysMastersDto.query_tables.map((m) => {
      const tbname = m.tableName;
      const fields = m.fieldList.map((f) => {
        const c = f.columnName;
        const i = f.include;
        const n = m.tableName + '__' + f.fieldName;
        return { columnName: c, fieldName: n, include: i };
      });
      return { tableName: tbname, fieldList: fields };
    });

    const myTable = createSysMastersDto.query_tables[0].fieldList.slice();
    const forTableDropDownFields = createSysMastersDto.query_tables
      .slice(1)
      .map((m) => m.dropdownField);
    // const dropdownFieldCount=createSysMastersDto.query_tables.map
    let foreignDropDownCount = 0;
    createSysMastersDto.query_tables.slice(1).forEach((m) => {
      if (m.dropdownField) foreignDropDownCount++;
    });

    const paramsArray = [];

    for (let n = 0; n < myTable.length; n++) {
      if (
        myTable[n].fieldName === 'id' ||
        myTable[n].fieldName === 'is_active' ||
        myTable[n].fieldName === 'created_by' ||
        myTable[n].fieldName === 'updated_by' ||
        myTable[n].fieldName === 'deleted_at' ||
        myTable[n].fieldName === 'created_at' ||
        myTable[n].fieldName === 'updated_at'
      ) {
        continue;
      }
      let fieldApiStrig = '';
      if (myTable[n].foreignKey && myTable[n].foreign_table_id) {
        // find the table first using the foreign_table_id
        const foreignTableRecord = await this.sysTables.findOne({
          where: {
            id: myTable[n].foreign_table_id,
          },
        });
        const dropdownAttr = [
          'id',
          forTableDropDownFields[foreignDropDownCount - 1],
        ];
        fieldApiStrig = `/api/v1/${
          foreignTableRecord.table_name
        }?attributes=${encodeURIComponent(JSON.stringify(dropdownAttr))}`;
        console.log(fieldApiStrig);
      }
      const fieldDef = {
        fieldName: myTable[n].fieldName,
        fieldType: myTable[n].fieldType,
        fieldLabel: myTable[n].columnName,
        foreignKey: myTable[n].foreignKey,
        fieldApi: fieldApiStrig,
      };
      paramsArray.push(fieldDef);
    }

    // console.log(paramsArray);
    await this.sys_masters.create({
      ...createSysMastersDto,
      grid_params: JSON.stringify(dto),
      grid_api: gridUrl,
      grid_columns: JSON.stringify(tableColumns),
      created_by: payload.sub,
    });
    const response = await this.sys_masters.create({
      ...createSysMastersDto,
      slug_type: 'create',
      create_params: JSON.stringify(paramsArray),
      create_api: createUrl,
      grid_columns: JSON.stringify(tableColumns),
      created_by: payload.sub,
    });
    //return decodeURIComponent(gridUrl);
    return 'two records added!';
    //return paramsArray;
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

  async findBySlug(slug_name: string, slug_type: string, payload: any) {
    const thisTableInfo = await this.sysTables.findOne({
      where: { table_name: 'sys_masters', is_active: true },
    });
    if (!thisTableInfo) throw new ForbiddenException('table not found');
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
        slug_name: slug_name,
        slug_type: slug_type,
        is_active: 1,
      },
      attributes: [`${slug_type}_params`, `${slug_type}_api`, 'grid_columns'],
      include: [],
    });
    return response || {};
    //return {};
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
