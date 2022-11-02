/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Sample3 } from './sample3.model';
import { CreateSample3Dto } from './dto/create-sample3.dto';
import { UpdateSample3Dto } from './dto/update-sample3.dto';
@Injectable()
      export class Sample3Service {
        constructor(
          @InjectModel(Sample3)
          private sample3: typeof Sample3,
          private helpers: HelpersService,
        ) {}
       async create(createSample3Dto: CreateSample3Dto, payload: any) {
        try {
          const response =  await this.sample3.create({
            ...createSample3Dto,
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
      const data = await this.sample3.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sample3');
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
          const response = await this.sample3.findOne({
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

  async update(id: number, updateSample3Dto: UpdateSample3Dto,payload: any) {
    try {
        const response = await this.sample3.update(
          { 
            ...updateSample3Dto,
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
          const response = await this.sample3.update(
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
  
