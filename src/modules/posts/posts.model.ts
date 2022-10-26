/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { users } from 'src/modules/users/users.model';

	@Table({tableName: 'posts',timestamps: false,comment: ""})
	export class posts extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	post_id!: number;

	@Column({type: DataType.STRING})
	title!: string;

	@ForeignKey(() => users)
	@Column({                                  
	type: DataType.INTEGER
	})
	user_id!: number;

	@BelongsTo(() => users)
	user?: users;

    }
