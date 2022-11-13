/* eslint-disable prettier/prettier */
import { SysRoleMenu } from 'src/modules/sys_role_menu/sys_role_menu.model';

import { SysRoleTable } from 'src/modules/sys_role_table/sys_role_table.model';

import { SysUsers } from 'src/modules/sys_users/sys_users.model';

import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';

@Table({
  tableName: 'sys_roles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '',
})
export class SysRoles extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: true })
  role_name!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  is_active: boolean;

  @Column({ type: DataType.INTEGER })
  created_by?: number;

  @Column({ type: DataType.INTEGER })
  updated_by?: number;

  @Column({ type: DataType.DATE })
  deleted_at?: Date;

  @HasMany(() => SysUsers)
  sys_users?: SysUsers[];

  @HasMany(() => SysRoleTable)
  sys_role_table?: SysRoleTable[];

  @HasMany(() => SysRoleMenu)
  sys_role_menu?: SysRoleMenu[];
}
