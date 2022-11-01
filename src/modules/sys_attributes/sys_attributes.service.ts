/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysAttributes } from './sys_attributes.model';
import { CreateSysAttributesDto } from './dto/create-sys_attributes.dto';
import { UpdateSysAttributesDto } from './dto/update-sys_attributes.dto';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';
import { SysTypes } from 'src/modules/sys_types/sys_types.model';
@Injectable()
      export class SysAttributesService {
        constructor(
          @InjectModel(SysAttributes)
          private sys_attributes: typeof SysAttributes,
          private helpers: HelpersService,
        ) {}
        create(createSysAttributesDto: CreateSysAttributesDto, payload: any) {
          return this.sys_attributes.create({
            ...createSysAttributesDto,
            created_at: sequelize.fn('NOW'),
            created_by: payload.sub,
          });
        }

    async findAll(page: number, size: number, field: string, search: string) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` }, is_active: 1 }
        : {is_active: 1};
      const { limit, offset } = this.helpers.getPagination(page, size);
      const data = await this.sys_attributes.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [{model:SysTables},{model:SysTypes}],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sys_attributes');
      return response;
    }

    findOne(id: number) {
      return this.sys_attributes.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [{model:SysTables},{model:SysTypes}],
      });
    }

  async update(id: number, updateSysAttributesDto: UpdateSysAttributesDto,payload: any) {
    const result = await this.sys_attributes.update(
      { 
        ...updateSysAttributesDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
       },
      { where: { id }, returning: true },
    );

    return result;
  }

  async remove(id: number) {
    return await this.sys_attributes.update(
      {
          is_active: 0,
          deleted_at: sequelize.fn('NOW'),
        },
        { where: { id } },
      );
    }
  }
  
