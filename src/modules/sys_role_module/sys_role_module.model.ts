/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';
import { SysModules } from 'src/modules/sys_modules/sys_modules.model';

	@Table({tableName: 'sys_role_module',timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', comment: ""})
	export class SysRoleModule extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.INTEGER, unique: false})
	accesible!: number;

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

	@ForeignKey(() => SysRoles)
	@Column({                                  
	type: DataType.INTEGER
	})
	sys_roles_id?: number;

	@ForeignKey(() => SysModules)
	@Column({                                  
	type: DataType.INTEGER
	})
	sys_modules_id?: number;

	@BelongsTo(() => SysRoles)
	SysRoles?: SysRoles;

	@BelongsTo(() => SysModules)
	SysModules?: SysModules;

    }
