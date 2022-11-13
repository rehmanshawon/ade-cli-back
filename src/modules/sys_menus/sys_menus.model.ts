/* eslint-disable prettier/prettier */
import { SysRoleMenu } from 'src/modules/sys_role_menu/sys_role_menu.model';

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
import { SysModules } from 'src/modules/sys_modules/sys_modules.model';

@Table({
  tableName: 'sys_menus',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '',
})
export class SysMenus extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false })
  menu_name!: string;

  @Column({ type: DataType.STRING, unique: false })
  menu_url?: string;

  @Column({ type: DataType.STRING, unique: false })
  menu_icon_url?: string;

  @Column({ type: DataType.INTEGER, unique: false })
  menu_order?: number;

  @Column({ type: DataType.INTEGER, unique: false })
  parent_menu?: number;

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

  @ForeignKey(() => SysModules)
  @Column({
    type: DataType.INTEGER,
  })
  module_id?: number;

  @BelongsTo(() => SysModules)
  SysModule?: SysModules;

  @HasMany(() => SysRoleMenu)
  sys_role_menu?: SysRoleMenu[];
}
