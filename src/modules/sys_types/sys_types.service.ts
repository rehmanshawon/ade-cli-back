/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Sys_types } from './sys_types.model';
import { CreateSys_typesDto } from './dto/create-sys_types.dto';
import { UpdateSys_typesDto } from './dto/update-sys_types.dto';
@Injectable()
      export class Sys_typesService {
        constructor(
          @InjectModel(Sys_types)
          private sys_types: typeof Sys_types,
          private helpers: HelpersService,
        ) {}
        create(createSys_typesDto: CreateSys_typesDto, payload: any) {
          return this.sys_types.create({
            ...createSys_typesDto,
            created_at: sequelize.fn('NOW'),
            created_by: payload.sub,
          });
        }

    async findAll(page: number, size: number, field: string, search: string) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` }, is_active: 1 }
        : {is_active: 1};
      const { limit, offset } = this.helpers.getPagination(page, size);
      const data = await this.sys_types.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sys_types');
      return response;
    }

    findOne(id: number) {
      return this.sys_types.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [],
      });
    }

  async update(id: number, updateSys_typesDto: UpdateSys_typesDto,payload: any) {
    const result = await this.sys_types.update(
      { 
        ...updateSys_typesDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
       },
      { where: { id }, returning: true },
    );

    return result;
  }

  async remove(id: number) {
    return await this.sys_types.update(
      {
          is_active: 0,
          deleted_at: sequelize.fn('NOW'),
        },
        { where: { id } },
      );
    }
  }
  
