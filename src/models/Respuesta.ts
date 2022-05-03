import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Pregunta } from './Pregunta'

@Table
export class Respuesta extends Model<Respuesta> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_respuesta!: number

    @ForeignKey(() => Pregunta)
    @Column(DataType.INTEGER)
    id_pregunta?: number

    @Column(DataType.STRING(500))
    descripcion!: string

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    correcta!: Boolean

    @Column(DataType.STRING(150))
    img!: string

    @BelongsTo(() => Pregunta)
    pregunta?: Pregunta
}