/* eslint-disable prettier/prettier */

import { AllowNull, Column, Model, Table, Unique, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { SysRole } from 'src/modules/sys_roles/models/sys-roles.model';

@Table({timestamps:true,paranoid:true,underscored: true})
export class SysUser extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  userId:number;

  @Column
  userName: string;

  @Unique
  @Column 
  email: string;
  
  @Column
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;  

  @ForeignKey(() => SysRole)
  @Column
  roleId: number

  @BelongsTo(() => SysRole)
  role: SysRole

  @AllowNull
  @Column  
  createdBy: number;

  @AllowNull
  @Column  
  updatedBy: number;   
}
//SysUser.s