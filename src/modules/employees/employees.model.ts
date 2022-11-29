/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { Farms } from 'src/modules/farms/farms.model';
export const privilegeTypes = ['active','inactive'];
	@Table({tableName: 'employees',timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', comment: ""})
	export class Employees extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: false})
	name!: string;

	@Column({type: DataType.STRING, unique: false})
	phone!: string;

  	@Column(DataType.ENUM({ values: privilegeTypes }))
  	status!: string;

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

	@ForeignKey(() => Farms)
	@Column({                                  
	type: DataType.INTEGER
	})
	farms_id?: number;

	@BelongsTo(() => Farms)
	Farms?: Farms;

    }
