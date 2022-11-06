/* eslint-disable prettier/prettier */
import { SysUserModule } from 'src/modules/sys_user_module/sys_user_module.model';

import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';

	@Table({tableName: 'sys_users',timestamps: false,comment: ""})
	export class SysUsers extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: false})
	user_name!: string;

	@Column({type: DataType.STRING, unique: true})
	email!: string;

	@Column({type: DataType.STRING, unique: false})
	password!: string;

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

	@BelongsTo(() => SysRoles)
	SysRole?: SysRoles;


	@HasMany(() => SysUserModule)
	sys_user_module?: SysUserModule[];

    }
