/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Sample4 } from './sample4.model';
import { CreateSample4Dto } from './dto/create-sample4.dto';
import { UpdateSample4Dto } from './dto/update-sample4.dto';
@Injectable()
      export class Sample4Service {
        constructor(
          @InjectModel(Sample4)
          private sample4: typeof Sample4,
          private helpers: HelpersService,
        ) {}
       async create(createSample4Dto: CreateSample4Dto, payload: any) {
        try {
          const response =  await this.sample4.create({
            ...createSample4Dto,
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
      const data = await this.sample4.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sample4');
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
          const response = await this.sample4.findOne({
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

  async update(id: number, updateSample4Dto: UpdateSample4Dto,payload: any) {
    try {
        const response = await this.sample4.update(
          { 
            ...updateSample4Dto,
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
          const response = await this.sample4.update(
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
  
