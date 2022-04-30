import { Column, HasMany, Model, PrimaryKey, Table, DataType, AutoIncrement } from 'sequelize-typescript'
import { Usuario } from './Usuario'
@Table
export class Membership extends Model<Membership>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id_membership!: number

    @Column(DataType.DATE)
    startAt!: Date

    @Column(DataType.DATE)
    endAt!: Date

    @HasMany(() => Usuario)
    usuario?: Usuario
}