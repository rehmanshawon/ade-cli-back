/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { SysUsers } from 'src/modules/sys_users/sys_users.model';
import { SysModules } from 'src/modules/sys_modules/sys_modules.model';

	@Table({tableName: 'sys_user_module',timestamps: false,comment: ""})
	export class SysUserModule extends Model {
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

	@ForeignKey(() => SysUsers)
	@Column({                                  
	type: DataType.INTEGER
	})
	user_id?: number;

	@ForeignKey(() => SysModules)
	@Column({                                  
	type: DataType.INTEGER
	})
	module_id?: number;

	@BelongsTo(() => SysUsers)
	SysUser?: SysUsers;

	@BelongsTo(() => SysModules)
	SysModule?: SysModules;

    }
