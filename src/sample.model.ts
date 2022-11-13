/* eslint-disable prettier/prettier */
// import { SysRoleMenu } from 'src/modules/sys_role_menu/sys_role_menu.model';

// import { SysRoleTable } from 'src/modules/sys_role_table/sys_role_table.model';

// import { SysUsers } from 'src/modules/sys_users/sys_users.model';

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

@Table({ tableName: 'sample', timestamps: true, paranoid: true, comment: '' })
export class Sample extends Model {
  //   @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  //   @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  //   id?: number;

  @Column({ type: DataType.STRING, unique: true })
  sample_field!: string;

  @Column({ type: DataType.STRING, unique: true })
  sample_field2!: string;

  @Column({ type: DataType.BOOLEAN })
  is_active!: boolean;

  @Column({ type: DataType.INTEGER })
  created_by?: number;

  @Column({ type: DataType.INTEGER })
  updated_by?: number;
}
