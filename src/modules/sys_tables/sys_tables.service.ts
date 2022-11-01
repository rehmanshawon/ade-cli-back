/* eslint-disable prettier/prettier */
import {SysAttributes} from 'src/modules/sys_attributes/sys_attributes.model';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysTables } from './sys_tables.model';
import { CreateSysTablesDto } from './dto/create-sys_tables.dto';
import { UpdateSysTablesDto } from './dto/update-sys_tables.dto';
@Injectable()
      export class SysTablesService {
        constructor(
          @InjectModel(SysTables)
          private sys_tables: typeof SysTables,
          private helpers: HelpersService,
        ) {}
        create(createSysTablesDto: CreateSysTablesDto, payload: any) {
          return this.sys_tables.create({
            ...createSysTablesDto,
            created_at: sequelize.fn('NOW'),
            created_by: payload.sub,
          });
        }

    async findAll(page: number, size: number, field: string, search: string) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` }, is_active: 1 }
        : {is_active: 1};
      const { limit, offset } = this.helpers.getPagination(page, size);
      const data = await this.sys_tables.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [{model:SysAttributes},],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sys_tables');
      return response;
    }

    findOne(id: number) {
      return this.sys_tables.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [{model:SysAttributes},],
      });
    }

  async update(id: number, updateSysTablesDto: UpdateSysTablesDto,payload: any) {
    const result = await this.sys_tables.update(
      { 
        ...updateSysTablesDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
       },
      { where: { id }, returning: true },
    );

    return result;
  }

  async remove(id: number) {
    return await this.sys_tables.update(
      {
          is_active: 0,
          deleted_at: sequelize.fn('NOW'),
        },
        { where: { id } },
      );
    }
  }
  
