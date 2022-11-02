/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
       async create(createSysTablesDto: CreateSysTablesDto, payload: any) {
        try {
          const response =  await this.sys_tables.create({
            ...createSysTablesDto,
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
      const data = await this.sys_tables.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sys_tables');
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
          const response = await this.sys_tables.findOne({
            where: {
              id,
              is_active: 1,
            },
            include: [],
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

  async update(id: number, updateSysTablesDto: UpdateSysTablesDto,payload: any) {
    try {
        const response = await this.sys_tables.update(
          { 
            ...updateSysTablesDto,
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
          const response = await this.sys_tables.update(
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
  
