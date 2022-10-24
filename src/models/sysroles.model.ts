/* eslint-disable prettier/prettier */


import { AllowNull, Column, Model, Table, Unique, HasMany,PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { SysUser } from 'src/modules/sys-users/models/sys-users.model';

@Table({timestamps:true,paranoid:true,underscored: true})
export class SysRole extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  roleId:number;

  @Unique
  @Column
  roleName: string;
  
  @HasMany(() => SysUser)
  users: SysUser[]

  @Column({ defaultValue: true })
  isActive: boolean;  

  @AllowNull
  @Column  
  createdBy: number;

  @AllowNull
  @Column  
  updatedBy: number;   
}