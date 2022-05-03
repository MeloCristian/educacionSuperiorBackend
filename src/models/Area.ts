import { Column, HasMany, Model, PrimaryKey, Table, BelongsTo, ForeignKey, DataType, AutoIncrement } from 'sequelize-typescript'
import { Pregunta } from './Pregunta'

@Table({
    initialAutoIncrement: '100'
})
export class Area extends Model<Area>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_area!: number

    @Column(DataType.STRING)
    nombre!: string

    @Column(DataType.STRING(300))
    descripcion!: string

    @Column(DataType.STRING(100))
    img!: string

    @HasMany(() => Pregunta)
    pregunta?: Pregunta
}