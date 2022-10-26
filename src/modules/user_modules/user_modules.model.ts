/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { users } from 'src/modules/users/users.model';
import { modules } from 'src/modules/modules/modules.model';

	@Table({tableName: 'user_modules',timestamps: false,comment: ""})
	export class user_modules extends Model {

	@ForeignKey(() => users)
	@Column({                                  
	type: DataType.INTEGER
	})
	@Index({

name: "PRIMARY",
	using: "BTREE",
	order: "ASC",
	unique: true 
	})
	user_id!: number;

	@ForeignKey(() => modules)
	@Column({                                  
	type: DataType.INTEGER
	})
	@Index({

name: "PRIMARY",
	using: "BTREE",
	order: "ASC",
	unique: true 
	})
	module_id!: number;

    }
