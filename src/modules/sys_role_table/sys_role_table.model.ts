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
import { SysRoles } from 'src/modules/sys_roles/sys_roles.model';
import { SysTables } from 'src/modules/sys_tables/sys_tables.model';
export const privilegeTypes = [
  'All',
  'Create',
  'Read',
  'Update',
  'Delete',
  'None',
];
@Table({
  tableName: 'sys_role_table',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '',
})
export class SysRoleTable extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column(DataType.ENUM({ values: privilegeTypes }))
  access_type!: string;

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

  @ForeignKey(() => SysRoles)
  @Column({
    type: DataType.INTEGER,
  })
  role_id?: number;

  @ForeignKey(() => SysTables)
  @Column({
    type: DataType.INTEGER,
  })
  table_id?: number;

  @BelongsTo(() => SysRoles)
  SysRole?: SysRoles;

  @BelongsTo(() => SysTables)
  SysTable?: SysTables;
}
