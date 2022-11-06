/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { Motiure } from 'src/modules/motiure/motiure.model';

	@Table({tableName: 'shoes',timestamps: false,comment: ""})
	export class Shoes extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: false})
	name!: string;

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

	@ForeignKey(() => Motiure)
	@Column({                                  
	type: DataType.INTEGER
	})
	shoe_id?: number;

	@BelongsTo(() => Motiure)
	Motiure?: Motiure;

    }
