/* eslint-disable prettier/prettier */
import {Employee} from 'src/modules/employee/employee.model';


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { Department } from './department.model';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department)
    private department: typeof Department,
    private helpers: HelpersService,
  ) {}
  create(createDepartmentDto: CreateDepartmentDto, payload: any) {
    return this.department.create({
      ...createDepartmentDto,
      created_at: sequelize.fn('NOW'),
      created_by: payload.sub,
    });
  }

  async findAll(page: number, size: number, field: string, search: string) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` }, is_active: 1 }
      : { is_active: 1 };
    const { limit, offset } = this.helpers.getPagination(page, size);
    const data = await this.department.findAndCountAll({
      order: [['id', 'DESC']],
      include: [{model:Employee},],
      where: condition,
      limit,
      offset,
    });
    const response = this.helpers.getPagingData(
      data,
      page,
      limit,
      'department',
    );
    return response;
  }

  findOne(id: number) {
    return this.department.findOne({
      where: {
        id,
        is_active: 1,
      },
      include: [{model:Employee},],
    });
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
    payload: any,
  ) {
    const result = await this.department.update(
      {
        ...updateDepartmentDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return result;
  }

  async remove(id: number) {
    return await this.department.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
  }
}
