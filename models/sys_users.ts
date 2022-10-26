import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { sys_roles } from "./sys_roles";

@Table({ tableName: "sys_users", timestamps: false })
export class sys_users extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    user_id?: number;
    @Column({ type: DataType.STRING(255) })
    user_name!: string;
    @Column({ type: DataType.STRING(255) })
    email!: string;
    @Column({ type: DataType.STRING(255) })
    password!: string;
    @Column({ type: DataType.TINYINT, defaultValue: "1" })
    is_active?: number;
    @ForeignKey(() => sys_roles)
    @Column({ allowNull: true, type: DataType.INTEGER })
    role_id?: number;
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
    @BelongsTo(() => sys_roles)
    sys_role?: sys_roles;
}