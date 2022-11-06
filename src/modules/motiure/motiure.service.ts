/* eslint-disable prettier/prettier */
import {Shoes} from 'src/modules/shoes/shoes.model';

import { ForbiddenException,UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Motiure } from './motiure.model';
import { CreateMotiureDto } from './dto/create-motiure.dto';
import { UpdateMotiureDto } from './dto/update-motiure.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
@Injectable()
      export class MotiureService {
        constructor(
          @InjectModel(Motiure)
          private motiure: typeof Motiure,
          @InjectModel(SysRoleTable) 
          private role_table: typeof SysRoleTable,
          @InjectModel(SysTables) 
          private sysTables: typeof SysTables,
          private helpers: HelpersService,
        ) {}
       async create(createMotiureDto: CreateMotiureDto, payload: any) {
        try {
          const thisTableInfo = await this.sysTables.findOne({where: { table_name: 'motiure' }});
          if (!thisTableInfo) throw new ForbiddenException();
          const canCreate = await this.role_table.findOne({
            where: {
              role_id: payload.role,
              table_id: thisTableInfo.id,
              access_type: 'All' || 'Create',
            },
          });
          if (!canCreate) throw new UnauthorizedException();
          const response =  await this.motiure.create({
            ...createMotiureDto,
            created_at: sequelize.fn('NOW'),
            created_by: payload.sub,
          });
          return response;
        }catch (err) {
      throw err;
    }
  }

    async findAll(page: number, size: number, field: string, search: string,payload: any) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` }, is_active: 1 }
        : {is_active: 1};
      const { limit, offset } = this.helpers.getPagination(page, size);
      try {
        const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'motiure' },
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
      const data = await this.motiure.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [{model:Shoes},],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'motiure');
      return response;
    }catch (err) {
      throw err;
    }
  }

    async findOne(id: number, payload: any) {
       try {
        const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'motiure' },
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
          const response = await this.motiure.findOne({
            where: {
              id,
              is_active: 1,
            },
            include: [{model:Shoes},],
          });
          return response;
      } catch (err) {
      throw err;
    }
    }

  async update(id: number, updateMotiureDto: UpdateMotiureDto,payload: any) {
    try {
      const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'motiure' },
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
        const response = await this.motiure.update(
          { 
            ...updateMotiureDto,
            updated_at: sequelize.fn('NOW'),
            updated_by: payload.sub,
          },
          { where: { id }, returning: true },
        );

    return response;
    }catch (err) {
      throw err;
    }
  }

  async remove(id: number, payload: any) {
      try {
        const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'motiure' },
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
          const response = await this.motiure.update(
            {
                is_active: 0,
                deleted_at: sequelize.fn('NOW'),
              },
              { where: { id } },
            );
            return response;
      }catch (err) {
        throw err;
      }
    }
  }
  
