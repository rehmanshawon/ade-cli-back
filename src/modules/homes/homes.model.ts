/* eslint-disable prettier/prettier */
import { Customers } from 'src/modules/customers/customers.model';

import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';

	@Table({tableName: 'homes',timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', comment: ""})
	export class Homes extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: false})
	adreess!: string;

	@Column({type: DataType.INTEGER, unique: false})
	phone!: number;

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


	@HasMany(() => Customers)
	customers?: Customers[];

    }
