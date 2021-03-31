import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Rol } from './Rol'
import { Usuario_pregunta } from './Usuario_pregunta'


@Table({
    initialAutoIncrement: '1000'
})
export class Usuario extends Model<Usuario>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_usuario!: number

    @ForeignKey(() => Rol)
    @Column(DataType.INTEGER)
    id_rol!: number

    @Column(DataType.STRING(30))
    email_us!: string

    @Column(DataType.STRING(150))
    pass_us!:string

    @BelongsTo(()=>Rol)
    rol?: Rol

    @HasMany(()=> Usuario_pregunta)
    usuario_pregunta?: Usuario_pregunta

}