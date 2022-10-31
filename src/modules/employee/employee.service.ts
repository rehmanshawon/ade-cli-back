/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Employee } from './employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Department } from 'src/modules/department/department.model';
@Injectable()
      export class EmployeeService {
        constructor(
          @InjectModel(Employee)
          private employee: typeof Employee,
          private helpers: HelpersService,
        ) {}
        create(createEmployeeDto: CreateEmployeeDto, payload: any) {
          return this.employee.create({
            ...createEmployeeDto,
            created_at: sequelize.fn('NOW'),
            created_by: payload.sub,
          });
        }

    async findAll(page: number, size: number, field: string, search: string) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` }, is_active: 1 }
        : {is_active: 1};
      const { limit, offset } = this.helpers.getPagination(page, size);
      const data = await this.employee.findAndCountAll({        
        order: [['id', 'DESC']],
        include: [{model:Department}],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(data, page, limit,'employee');
      return response;
    }

    findOne(id: number) {
      return this.employee.findOne({
        where: {
          id,
          is_active: 1,
        },
        include: [{model:Department}],
      });
    }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto,payload: any) {
    const result = await this.employee.update(
      { 
        ...updateEmployeeDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
       },
      { where: { id }, returning: true },
    );

    return result;
  }

  async remove(id: number) {
    return await this.employee.update(
      {
          is_active: 0,
          deleted_at: sequelize.fn('NOW'),
        },
        { where: { id } },
      );
    }
  }
  
