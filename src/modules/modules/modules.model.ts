/* eslint-disable prettier/prettier */
import { user_modules } from 'src/modules/user_modules/user_modules.model';
import { users } from 'src/modules/users/users.model';

import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';

	@Table({tableName: 'modules',timestamps: false,comment: ""})
	export class modules extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	module_id!: number;

	@Column({type: DataType.STRING})
	module_name!: string;


	@BelongsToMany(() => users, () => user_modules)
	users?: users[];

    }
