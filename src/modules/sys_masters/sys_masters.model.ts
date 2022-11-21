/* eslint-disable prettier/prettier */
import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';

@Table({
  tableName: 'sys_masters',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '',
})
export class SysMasters extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: true })
  slug_name!: string;

  @Column({ type: DataType.STRING, unique: false })
  slug_type?: string;

  @Column({ type: DataType.TEXT, unique: false })
  grid_params?: string;

  @Column({ type: DataType.TEXT, unique: false })
  grid_api?: string;

  @Column({ type: DataType.TEXT, unique: false })
  grid_columns?: string;

  @Column({ type: DataType.TEXT, unique: false })
  create_form_params?: string;

  @Column({ type: DataType.TEXT, unique: false })
  update_form_params?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  is_active: boolean;

  @Column({ type: DataType.INTEGER })
  created_by?: number;

  @Column({ type: DataType.INTEGER })
  updated_by?: number;

  @Column({ type: DataType.DATE })
  deleted_at?: Date;
}
