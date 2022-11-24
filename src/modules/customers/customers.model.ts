/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { Homes } from 'src/modules/homes/homes.model';
export const privilegeTypes = ['active','inactive'];
	@Table({tableName: 'customers',timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', comment: ""})
	export class Customers extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: false})
	customer_name!: string;

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

	@ForeignKey(() => Homes)
	@Column({                                  
	type: DataType.INTEGER
	})
	homes_id?: number;

	@BelongsTo(() => Homes)
	Home?: Homes;

    }
