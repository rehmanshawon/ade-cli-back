/* eslint-disable prettier/prettier */
import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';
import { Writer } from 'src/modules/writer/writer.model';

	@Table({tableName: 'blog',timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', comment: ""})
	export class Blog extends Model {
	@Column({primaryKey: true, autoIncrement: true,type: DataType.INTEGER})
	@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
	id?: number;

	@Column({type: DataType.STRING, unique: true})
	title!: string;

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

	@ForeignKey(() => Writer)
	@Column({                                  
	type: DataType.INTEGER
	})
	writer_id?: number;

	@BelongsTo(() => Writer)
	Writer?: Writer;

    }
