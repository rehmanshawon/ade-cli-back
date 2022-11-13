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

@Table({ tableName: 'table1', timestamps: false, comment: '' })
export class Table1 extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false })
  field1!: string;

  @Column({ type: DataType.STRING, unique: false })
  field2!: string;

  @Column({ type: DataType.BOOLEAN })
  is_active!: boolean;

  @Column({ type: DataType.INTEGER })
  created_by?: number;

  @Column({ type: DataType.INTEGER })
  updated_by?: number;

  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal(
      'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    ),
    allowNull: false,
  })
  updated_at: Date;

  @Column({ type: DataType.DATE })
  deleted_at?: Date;
}
