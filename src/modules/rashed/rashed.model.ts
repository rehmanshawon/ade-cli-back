/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { RoleTest } from 'src/modules/role_test/role_test.model';

	@Table({tableName: 'rashed',timestamps: false,comment: ""})
	export class Rashed extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: true})
	rashed_name!: string;

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

	@ForeignKey(() => RoleTest)
	@Column({                                  
	type: DataType.INTEGER
	})
	role_test_id?: number;

	@BelongsTo(() => RoleTest)
	RoleTest?: RoleTest;

    }
