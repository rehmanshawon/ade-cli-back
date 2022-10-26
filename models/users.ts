import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "users", timestamps: false })
export class users extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    id?: number;
    @Column({ type: DataType.STRING(255) })
    name!: string;
    @Column({ type: DataType.STRING(255) })
    email!: string;
    @Column({ type: DataType.STRING(255) })
    password!: string;
    @Column({ type: DataType.ENUM('male','female') })
    gender!: string;
    @Column({ type: DataType.ENUM('admin','user') })
    role!: string;
    @Column({ field: "createdAt", type: DataType.DATE })
    createdat!: Date;
    @Column({ field: "updatedAt", type: DataType.DATE })
    updatedat!: Date;
}