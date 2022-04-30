import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'
import { Membership } from './Membership'
import { Persona } from './Persona'
import { Rol } from './Rol'
import { UsuarioPregunta } from './UsuarioPregunta'


@Table({
    initialAutoIncrement: '1000',
    timestamps: true,
})
export class Usuario extends Model<Usuario>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_usuario!: number

    @ForeignKey(() => Rol)
    @Column(DataType.INTEGER)
    id_rol!: number

    @ForeignKey(() => Persona)
    @Column(DataType.INTEGER)
    id_persona!: number

    @Unique
    @Column(DataType.STRING(30))
    email_us!: string

    @Column(DataType.STRING(150))
    pass_us!: string

    @ForeignKey(() => Membership)
    @Column(DataType.INTEGER)
    id_membership!: number

    @BelongsTo(() => Rol)
    rol?: Rol

    @BelongsTo(() => Persona)
    persona?: Persona

    @BelongsTo(() => Membership)
    membership?: Membership

    @HasMany(() => UsuarioPregunta)
    usuarioPregunta?: UsuarioPregunta

}