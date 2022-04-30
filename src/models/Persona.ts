import { Column, HasMany, Model, PrimaryKey, Table, DataType, AutoIncrement } from 'sequelize-typescript'
import { Usuario } from './Usuario'


@Table
export class Persona extends Model<Persona>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_persona!: number

    @Column(DataType.STRING(150))
    nombres!: string

    @Column(DataType.STRING(150))
    apellidos!: string

    @Column(DataType.DATE)
    fecha_nacimiento!: Date

    @HasMany(()=>Usuario)
    usuario?: Usuario
}