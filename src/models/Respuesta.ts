import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Pregunta } from './Pregunta'

@Table
export class Respuesta extends Model<Respuesta> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_respuesta!: number

    @ForeignKey(()=> Pregunta)
    @Column(DataType.INTEGER)
    id_pregunta?: number

    @Column(DataType.STRING(500))
    descripcion!: string

    @Column(DataType.BOOLEAN)
    correcta!: Boolean

    @BelongsTo(()=>Pregunta)
    pregunta?: Pregunta
}