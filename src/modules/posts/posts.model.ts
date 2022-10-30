/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { Users } from 'src/modules/users/users.model';

	@Table({tableName: 'posts',timestamps: false,comment: ""})
	export class Posts extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	post_id?: number;

	@Column({type: DataType.STRING, unique: false})
	title!: string;

	@Column({type: DataType.STRING, unique: false})
	body!: string;

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

	@ForeignKey(() => Users)
	@Column({                                  
	type: DataType.INTEGER
	})
	user_id?: number;

	@BelongsTo(() => Users)
	user?: Users;

    }
