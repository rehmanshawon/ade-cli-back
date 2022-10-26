/* eslint-disable prettier/prettier */
import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { sys_users } from './sys_users';

@Table({ tableName: 'sys_roles', timestamps: false })
export class sys_roles extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  role_id?: number;
  @Column({ type: DataType.STRING(255) })
  role_name!: string;
  @Column({ type: DataType.TINYINT, defaultValue: '1' })
  is_active?: number;
  @Column({ allowNull: true, type: DataType.INTEGER })
  created_by?: number;
  @Column({ allowNull: true, type: DataType.INTEGER })
  updated_by?: number;
  @Column({ type: DataType.DATE })
  created_at!: Date;
  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;
  @Column({ allowNull: true, type: DataType.DATE })
  deleted_at?: Date;
  @HasMany(() => sys_users, { sourceKey: 'role_id' })
  sys_users?: sys_users[];
}
