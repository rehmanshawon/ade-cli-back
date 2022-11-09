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
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';

@Table({ tableName: 'sys_attributes', timestamps: false, comment: '' })
export class SysAttributes extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false })
  attribute_name!: string;

  @Column({ type: DataType.STRING, unique: false })
  attribute_type!: string;

  @Column({ type: DataType.BOOLEAN, unique: false })
  primaryKey!: boolean;

  @Column({ type: DataType.BOOLEAN, unique: false })
  foreignKey!: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  foreign_table_id?: number;

  @Column({ type: DataType.BOOLEAN })
  is_active!: boolean;

  @Column({ type: DataType.INTEGER })
  created_by?: number;

  @Column({ type: DataType.INTEGER })
  updated_by?: number;

  @Column({ type: DataType.DATE })
  created_at!: Date;

  @Column({ type: DataType.DATE })
  updated_at?: Date;

  @Column({ type: DataType.DATE })
  deleted_at?: Date;

  @ForeignKey(() => SysTables)
  @Column({
    type: DataType.INTEGER,
  })
  sys_table_id?: number;

  @BelongsTo(() => SysTables)
  SysTable?: SysTables;
}
