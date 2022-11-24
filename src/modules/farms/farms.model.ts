/* eslint-disable prettier/prettier */
import { Employees } from 'src/modules/employees/employees.model';

import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';

	@Table({tableName: 'farms',timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', comment: ""})
	export class Farms extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: false})
	company_name!: string;

	@Column({type: DataType.INTEGER, unique: false})
	no_of_emp!: number;

	@Column({type: DataType.INTEGER, unique: false})
	company_phone!: number;

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


	@HasMany(() => Employees)
	employees?: Employees[];

    }
