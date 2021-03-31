import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript'
import {Usuario} from './Usuario'
import {Pregunta} from './Pregunta'

@Table({
    initialAutoIncrement: '1000'
})
export class Usuario_pregunta extends Model<Usuario_pregunta>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_usuario_pregunta!: number
    
    @ForeignKey(()=> Usuario)
    @Column(DataType.INTEGER)
    id_usuario!: number

    @ForeignKey(()=> Pregunta)
    @Column(DataType.INTEGER)
    id_pregunta!: number

    @Column(DataType.INTEGER)
    veces_cantestada!: Number

    
    @BelongsTo(()=> Usuario)
    usuario?: Usuario

    @BelongsTo(()=> Pregunta)
    pregunta?: Pregunta

}