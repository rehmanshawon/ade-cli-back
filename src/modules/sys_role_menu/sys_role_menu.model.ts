/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';
import { SysMenus } from 'src/modules/sys_menus/sys_menus.model';

	@Table({tableName: 'sys_role_menu',timestamps: false,comment: ""})
	export class SysRoleMenu extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.BOOLEAN, unique: false})
	accessible!: boolean;

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

	@ForeignKey(() => SysRoles)
	@Column({                                  
	type: DataType.INTEGER
	})
	role_id?: number;

	@ForeignKey(() => SysMenus)
	@Column({                                  
	type: DataType.INTEGER
	})
	menu_id?: number;

	@BelongsTo(() => SysRoles)
	SysRole?: SysRoles;

	@BelongsTo(() => SysMenus)
	SysMenu?: SysMenus;

    }
