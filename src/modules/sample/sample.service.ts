/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Sample } from './sample.model';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
@Injectable()
      export class SampleService {
        constructor(
          @InjectModel(Sample)
          private sample: typeof Sample,
          private helpers: HelpersService,
        ) {}
       async create(createSampleDto: CreateSampleDto, payload: any) {
        try {
          const response =  await this.sample.create({
            ...createSampleDto,
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
      const data = await this.sample.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'sample');
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
          const response = await this.sample.findOne({
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

  async update(id: number, updateSampleDto: UpdateSampleDto,payload: any) {
    try {
        const response = await this.sample.update(
          { 
            ...updateSampleDto,
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
          const response = await this.sample.update(
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
  
