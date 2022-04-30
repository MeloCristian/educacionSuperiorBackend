import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Usuario } from './Usuario'
import { Pregunta } from './Pregunta'

@Table({
    initialAutoIncrement: '1000',
    tableName: 'usuario_pregunta'
})
export class UsuarioPregunta extends Model<UsuarioPregunta>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_usuario_pregunta!: number

    @ForeignKey(() => Usuario)
    @Column(DataType.INTEGER)
    id_usuario!: number

    @ForeignKey(() => Pregunta)
    @Column(DataType.INTEGER)
    id_pregunta!: number

    @BelongsTo(() => Usuario)
    usuario?: Usuario

    @BelongsTo(() => Pregunta)
    pregunta?: Pregunta

}