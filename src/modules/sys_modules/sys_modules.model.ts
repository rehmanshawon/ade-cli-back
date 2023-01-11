/* eslint-disable prettier/prettier */
import { SysMenuPriviledge } from 'src/modules/sys_menu_priviledge/sys_menu_priviledge.model';

import { SysUserModule } from 'src/modules/sys_user_module/sys_user_module.model';

import { SysMenus } from 'src/modules/sys_menus/sys_menus.model';

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
  tableName: 'sys_modules',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '',
})
export class SysModules extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: true })
  module_name!: string;

  @Column({ type: DataType.STRING, unique: false })
  module_url!: string;

  @Column({ type: DataType.STRING, unique: false })
  module_icon_url!: string;

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

  // @HasMany(() => SysMenus)
  // sys_menus?: SysMenus[];

  @HasMany(() => SysUserModule)
  sys_user_module?: SysUserModule[];

	@HasMany(() => SysMenuPriviledge)
	sys_menu_priviledge?: SysMenuPriviledge[];

}
