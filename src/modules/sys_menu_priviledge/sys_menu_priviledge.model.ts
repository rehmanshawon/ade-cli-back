/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { SysMenus } from 'src/modules/sys_menus/sys_menus.model';
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';
import { SysModules } from 'src/modules/sys_modules/sys_modules.model';

	@Table({tableName: 'sys_menu_priviledge',timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', comment: ""})
	export class SysMenuPriviledge extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
	is_active: boolean;

	@Column({type: DataType.INTEGER})
	created_by?: number;

	@Column({type: DataType.INTEGER})
	updated_by?: number;

	@Column({type: DataType.DATE})
	deleted_at?: Date;

	@ForeignKey(() => SysMenus)
	@Column({                                  
	type: DataType.INTEGER
	})
	menu_id?: number;

	@ForeignKey(() => SysRoles)
	@Column({                                  
	type: DataType.INTEGER
	})
	role_id?: number;

	@ForeignKey(() => SysModules)
	@Column({                                  
	type: DataType.INTEGER
	})
	module_id?: number;

	@BelongsTo(() => SysMenus)
	SysMenus?: SysMenus;

	@BelongsTo(() => SysRoles)
	SysRoles?: SysRoles;

	@BelongsTo(() => SysModules)
	SysModules?: SysModules;

    }
