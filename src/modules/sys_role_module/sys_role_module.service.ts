/* eslint-disable prettier/prettier */
import { ForbiddenException,UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysRoleModule } from './sys_role_module.model';
import { CreateSysRoleModuleDto } from './dto/create-sys_role_module.dto';
import { UpdateSysRoleModuleDto } from './dto/update-sys_role_module.dto';
import { SysTables } from '../sys_tables/sys_tables.model';
import { SysRoleTable } from '../sys_role_table/sys_role_table.model';
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';
import { SysModules } from 'src/modules/sys_modules/sys_modules.model';
@Injectable()
      export class SysRoleModuleService {
        constructor(
          @InjectModel(SysRoleModule)
          private sys_role_module: typeof SysRoleModule,
          @InjectModel(SysRoleTable) 
          private role_table: typeof SysRoleTable,
          @InjectModel(SysTables) 
          private sysTables: typeof SysTables,
          private helpers: HelpersService,
        ) {}
       async create(createSysRoleModuleDto: CreateSysRoleModuleDto, payload: any) {
        
          const thisTableInfo = await this.sysTables.findOne({where: { table_name: 'sys_role_module',is_active:true, }});
          if (!thisTableInfo) throw new ForbiddenException();
          const canCreate = await this.role_table.findOne({
            where: {
              role_id: payload.role,
              table_id: thisTableInfo.id,
              access_type: 'All' || 'Create',
              is_active:true,
            },
          });
          if (!canCreate) throw new UnauthorizedException();
          const response =  await this.sys_role_module.create({
            ...createSysRoleModuleDto,            
            created_by: payload.sub,            
          });
          return 'one sys_role_module added!';        
  }

    async findAll(
      attributes: string,
      includes: string,
      iattributes: string,
      isDropDown = false,
      page: number, 
      size: number, 
      field: string, 
      search: string,
      payload: any) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` }, is_active: 1 }
        : {is_active: 1};
      const { limit, offset } = this.helpers.getPagination(page, size);
      const modelIncludes = includes ? JSON.parse(includes) : null;
    const attributesInclude = iattributes ? JSON.parse(iattributes) : null;    
        const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'sys_role_module',is_active:true, },
      });
      if (!thisTableInfo) throw new ForbiddenException();
      const canRead = await this.role_table.findOne({
        where: {
          role_id: payload.role,
          table_id: thisTableInfo.id,
          access_type: 'All' || 'Read',
          is_active:true,
        },
      });
      if (!canRead) throw new UnauthorizedException();
      const data = await this.sys_role_module.findAndCountAll({        
        order: [['id', 'DESC']],
        attributes: attributes ? JSON.parse(attributes) : null,
        include: [{model:SysRoles,attributes:attributesInclude? attributesInclude[
              modelIncludes.indexOf(this.helpers.toSnakeCase('SysRoles'))
            ]:[],},{model:SysModules,attributes:attributesInclude? attributesInclude[
              modelIncludes.indexOf(this.helpers.toSnakeCase('SysModules'))
            ]:[],}],
        where: condition,
        limit,
        offset,
      });
      const count = data.count;
      const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }),'sys_role_module'),
    );
      const response = this.helpers.getPagingData(isDropDown
        ? {
            count: data.count,
            rows: this.helpers.changeSpecificKeyOfObjectArray(
              data.rows.map((m) => m.get({ plain: true })),
              JSON.parse(attributes)[1],
              'label',
            ),
          }
        : { count: count, rows: plain }, page, limit,'sys_role_module');
      return response || {};
    
  }

    async findOne(id: number, payload: any) {       
        const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'sys_role_module',is_active:true, },
      });
      if (!thisTableInfo) throw new ForbiddenException();
      const canRead = await this.role_table.findOne({
        where: {
          role_id: payload.role,
          table_id: thisTableInfo.id,
          access_type: 'All' || 'Read',
          is_active:true,
        },
      });
      if (!canRead) throw new UnauthorizedException();
          const response = await this.sys_role_module.findOne({
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
            include: [{model:SysRoles,attributes:[],},{model:SysModules,attributes:[],}],
          });
          return response || {};
      
    }

  async update(id: number, updateSysRoleModuleDto: UpdateSysRoleModuleDto,payload: any) {   
      const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'sys_role_module',is_active:true, },
      });
      if (!thisTableInfo) throw new ForbiddenException();
      const canUpdate = await this.role_table.findOne({
        where: {
          role_id: payload.role,
          table_id: thisTableInfo.id,
          access_type: 'All' || 'Update',
          is_active:true,
        },
      });
      if (!canUpdate) throw new UnauthorizedException();
        const response = await this.sys_role_module.update(
          { 
            ...updateSysRoleModuleDto,
            updated_at: sequelize.fn('NOW'),
            updated_by: payload.sub,
          },
          { where: { id }, returning: true },
        );

    return "sys_role_module updated!";
    
  }

  async remove(id: number, payload: any) {     
        const thisTableInfo = await this.sysTables.findOne({
        where: { table_name: 'sys_role_module',is_active:true, },
      });
      if (!thisTableInfo) throw new ForbiddenException();
      const canDelete = await this.role_table.findOne({
        where: {
          role_id: payload.role,
          table_id: thisTableInfo.id,
          access_type: 'All' || 'Delete',
          is_active:true,
        },
      });
      if (!canDelete) throw new UnauthorizedException();
          const response = await this.sys_role_module.update(
            {
                is_active: 0,
                deleted_at: sequelize.fn('NOW'),
              },
              { where: { id } },
            );
            return "one record deleted from sys_role_module!";
      
    }
  }
  
