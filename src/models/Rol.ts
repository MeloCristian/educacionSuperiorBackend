import { AutoIncrement, Column, DataType, HasMany, PrimaryKey, Model, Table } from "sequelize-typescript";
import { Usuario } from "./Usuario";

@Table({
    initialAutoIncrement: '100'
})
export class Rol extends Model<Rol>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_rol!: number

    @Column(DataType.STRING(20))
    nombre!: string

    @Column(DataType.STRING(300))
    descripcion!: string

    @HasMany(() => Usuario)
    usuario?: Usuario
}