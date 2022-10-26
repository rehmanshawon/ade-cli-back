/* eslint-disable prettier/prettier */
import { user_modules } from 'src/modules/user_modules/user_modules.model';
import { modules } from 'src/modules/modules/modules.model';

import { posts } from 'src/modules/posts/posts.model';

import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';

	@Table({tableName: 'users',timestamps: false,comment: ""})
	export class users extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	user_id!: number;

	@Column({type: DataType.STRING})
	name!: string;


	@HasMany(() => posts)
	posts?: posts[];


	@BelongsToMany(() => modules, () => user_modules)
	modules?: modules[];

    }
