/* eslint-disable prettier/prettier */
import { Posts } from 'src/modules/posts/posts.model';

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

@Table({ tableName: 'users', timestamps: false, comment: '' })
export class Users extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false })
  name!: string;

  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, unique: false })
  password!: string;

  @Column({ type: DataType.STRING, unique: false })
  gender?: string;

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

  @HasMany(() => Posts)
  posts?: Posts[];
}
