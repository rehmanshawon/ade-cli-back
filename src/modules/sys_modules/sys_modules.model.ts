/* eslint-disable prettier/prettier */
import { SysUserModule } from 'src/modules/sys_user_module/sys_user_module.model';

import { SysMenus } from 'src/modules/sys_menus/sys_menus.model';

import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';

	@Table({tableName: 'sys_modules',timestamps: false,comment: ""})
	export class SysModules extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: true})
	module_name!: string;

	@Column({type: DataType.STRING, unique: false})
	module_url!: string;

	@Column({type: DataType.STRING, unique: false})
	module_icon_url!: string;

    	@Column({type: DataType.BOOLEAN})
	is_active!: boolean;

	@Column({type: DataType.INTEGER})
	created_by?: number;

	@Column({type: DataType.INTEGER})
	updated_by?: number;

	@Column({type: DataType.DATE})
	created_at!: Date;

	@Column({type: DataType.DATE})
	updated_at?: Date;

	@Column({type: DataType.DATE})
	deleted_at?: Date;


	@HasMany(() => SysMenus)
	sys_menus?: SysMenus[];


	@HasMany(() => SysUserModule)
	sys_user_module?: SysUserModule[];

    }
