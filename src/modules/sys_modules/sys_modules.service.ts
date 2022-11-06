/* eslint-disable prettier/prettier */
import {SysUserModule} from 'src/modules/sys_user_module/sys_user_module.model';

import {SysMenus} from 'src/modules/sys_menus/sys_menus.model';

import { ForbiddenException,UnauthorizedException, Injectable } from '@nestjs/common';
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
        try {
          const thisTableInfo = await this.sysTables.findOne({where: { table_name: 'sys_modules' }});
          if (!thisTableInfo) throw new ForbiddenException();
          const canCreate = await this.role_table.findOne({
            where: {
              role_id: payload.role,
              table_id: thisTableInfo.id,
              access_type: 'All' || 'Create',
            },
          });
          if (!canCreate) throw new UnauthorizedException();
          const response =  await this.sys_modules.create({
            ...createSysModulesDto,
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
        include: [{model:SysUserModule},{model:SysMenus},],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sys_modules');
      return response;
    }catch (err) {
      throw err;
    }
  }

    async findOne(id: number, payload: any) {
       try {
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
            where: {
              id,
              is_active: 1,
            },
            include: [{model:SysUserModule},{model:SysMenus},],
          });
          return response;
      } catch (err) {
      throw err;
    }
    }

  async update(id: number, updateSysModulesDto: UpdateSysModulesDto,payload: any) {
    try {
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

    return response;
    }catch (err) {
      throw err;
    }
  }

  async remove(id: number, payload: any) {
      try {
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
            return response;
      }catch (err) {
        throw err;
      }
    }
  }
  
