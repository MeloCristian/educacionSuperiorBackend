import { Column, HasMany, Model, PrimaryKey, Table, BelongsTo, ForeignKey, DataType, AutoIncrement, HasOne } from 'sequelize-typescript'
import { Area } from './Area'
import { Respuesta } from './Respuesta'
import { UsuarioPregunta } from './UsuarioPregunta'


@Table
export class Pregunta extends Model<Pregunta>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_pregunta!: number

    @ForeignKey(() => Area)
    @Column(DataType.INTEGER)
    id_area!: number

    @Column(DataType.STRING(500))
    clave!: string

    @Column(DataType.STRING(500))
    teroria!: string

    @Column(DataType.STRING(1000))
    descripcion!: string

    @Column(DataType.STRING(60))
    img!: string

    @BelongsTo(() => Area)
    area?: Area

    @HasMany(() => UsuarioPregunta)
    usuarioPregunta?: UsuarioPregunta

    @HasMany(() => Respuesta)
    respuestas?: Respuesta[]
}