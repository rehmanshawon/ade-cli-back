import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "teachers", timestamps: false })
export class teachers extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    id?: number;
    @Column({ type: DataType.STRING(255) })
    name!: string;
    @Column({ type: DataType.TINYINT, defaultValue: "1" })
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
}