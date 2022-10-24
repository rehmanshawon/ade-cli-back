/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { SysUser } from './models/sys-users.model';
import { SysRole } from '../sys_roles/models/sys-roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(SysUser)
    private readonly userModel: typeof SysUser,   
  ) {}

  create(createUserDto: CreateUserDto): Promise<SysUser> {   
    return this.userModel.create({
      userName: createUserDto.userName,
      email: createUserDto.email,
      password: createUserDto.password,
      roleId:createUserDto.roleId
    });
  }

  async findAll(): Promise<SysUser[]> {  
    return this.userModel.findAll({
      include:{
        model:SysRole, required:true
      },
    });
  }

  findOne(user_id: string): Promise<SysUser> {
    return this.userModel.findOne({
      where: {
        userId:user_id,
      },
      include:{
        model:SysRole, required:true
      }
    });
  }

  findOneByEmail(email: string): Promise<SysUser> {
    return this.userModel.findOne({
      where: {
        email,
      },
      include:{
        model:SysRole, required:true
      }
    });
  }

  async remove(userId: string): Promise<void> {
    const user = await this.userModel.findOne({where:{userId:userId,}});
    await user.destroy();
  }
}