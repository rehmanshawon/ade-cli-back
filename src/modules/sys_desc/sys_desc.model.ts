/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';

	@Table({tableName: 'sys_desc',timestamps: false,comment: ""})
	export class SysDesc extends Model {
@ForeignKey(() => SysTables)
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: true})
	desc_field!: string;

	@Column({type: DataType.STRING, unique: true})
	desc_detail!: string;

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

          @BelongsTo(() => SysTables)
          SysTable?: SysTables;

    }
