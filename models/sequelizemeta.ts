import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "sequelizemeta", timestamps: false })
export class sequelizemeta extends Model {
    @Column({ primaryKey: true, type: DataType.STRING(255) })
    name!: string;
}