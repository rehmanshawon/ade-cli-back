/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysDesc } from './sys_desc.model';
import { CreateSysDescDto } from './dto/create-sys_desc.dto';
import { UpdateSysDescDto } from './dto/update-sys_desc.dto';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';
@Injectable()
      export class SysDescService {
        constructor(
          @InjectModel(SysDesc)
          private sys_desc: typeof SysDesc,
          private helpers: HelpersService,
        ) {}
        create(createSysDescDto: CreateSysDescDto, payload: any) {
          return this.sys_desc.create({
            ...createSysDescDto,
            created_at: sequelize.fn('NOW'),
            created_by: payload.sub,
          });
        }

    async findAll(page: number, size: number, field: string, search: string) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` }, is_active: 1 }
        : {is_active: 1};
      const { limit, offset } = this.helpers.getPagination(page, size);
      const data = await this.sys_desc.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [{model:SysTables}],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sys_desc');
      return response;
    }

    findOne(id: number) {
      return this.sys_desc.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [{model:SysTables}],
      });
    }

  async update(id: number, updateSysDescDto: UpdateSysDescDto,payload: any) {
    const result = await this.sys_desc.update(
      { 
        ...updateSysDescDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
       },
      { where: { id }, returning: true },
    );

    return result;
  }

  async remove(id: number) {
    return await this.sys_desc.update(
      {
          is_active: 0,
          deleted_at: sequelize.fn('NOW'),
        },
        { where: { id } },
      );
    }
  }
  
