/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysAttributes } from './sys_attributes.model';
import { CreateSysAttributesDto } from './dto/create-sys_attributes.dto';
import { UpdateSysAttributesDto } from './dto/update-sys_attributes.dto';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';
@Injectable()
      export class SysAttributesService {
        constructor(
          @InjectModel(SysAttributes)
          private sys_attributes: typeof SysAttributes,
          private helpers: HelpersService,
        ) {}
       async create(createSysAttributesDto: CreateSysAttributesDto, payload: any) {
        try {
          const response =  await this.sys_attributes.create({
            ...createSysAttributesDto,
            created_at: sequelize.fn('NOW'),
            created_by: payload.sub,
          });
          return {
        error: false,
        statusCode: 201,
        message: 'record created successfully!',
        data: response,
      };
        }catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

    async findAll(page: number, size: number, field: string, search: string) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` }, is_active: 1 }
        : {is_active: 1};
      const { limit, offset } = this.helpers.getPagination(page, size);
      try {
      const data = await this.sys_attributes.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [{model:SysTables}],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sys_attributes');
      return {
        error: false,
        statusCode: 200,
        message: 'Success!',
        data: response,
      };
    }catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

    async findOne(id: number) {
       try {
          const response = await this.sys_attributes.findOne({
            where: {
              id,
              is_active: 1,
            },
            include: [{model:SysTables}],
          });
          return {
        error: false,
        statusCode: 200,
        message: 'Success!',
        data: response,
      };
      } catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    }

  async update(id: number, updateSysAttributesDto: UpdateSysAttributesDto,payload: any) {
    try {
        const response = await this.sys_attributes.update(
          { 
            ...updateSysAttributesDto,
            updated_at: sequelize.fn('NOW'),
            updated_by: payload.sub,
          },
          { where: { id }, returning: true },
        );

    return {
        error: false,
        statusCode: 200,
        message: 'Update success!',
        data: response,
      };
    }catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
      try {
          const response = await this.sys_attributes.update(
            {
                is_active: 0,
                deleted_at: sequelize.fn('NOW'),
              },
              { where: { id } },
            );
            return {
          error: false,
          statusCode: 200,
          message: 'Delete success!',
          data: response,
        };
      }catch (err) {
        throw new HttpException(
          {
            error: true,
            statusCode: HttpStatus.BAD_REQUEST,
            message: err.errors[0].message,
            data: [],
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  
