import { AfterCreate, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Transaction } from "sequelize/types";
import jwt from 'jsonwebtoken'
import {Op} from 'sequelize'

@Table
export class BlackListToken extends Model<BlackListToken>{
    @PrimaryKey
    @Column(DataType.STRING)
    token!: string

    @Column(DataType.DATE)
    exp!: Date

    @AfterCreate
    static borrar(instance: BlackListToken,{transaction}: any){
        const {exp} = instance
        if(exp.getTime()> Date.now()){
            return instance.destroy(transaction)
        }
    }
    
    static async blackList(token:string, key:any) {
        const data:any = jwt.verify(token, key)
        if (!data || typeof data.exp !== 'number') {
          throw new Error('Token sin tiempo de expiración')
        }
        const exp = new Date(1000 * data.exp)
        if (isNaN(exp.getTime())) {
          throw new Error('Tiempo de expiración inválido')
        }

        let datos = new BlackListToken
        datos.exp = exp
        datos.token = token
        return BlackListToken.create(datos)
      }

      static verify(token:any){
        return BlackListToken.findByPk(token).then(t => {
          if (t) {
            throw new Error('Token en blacklist')
          }
        })
      }

      static purge(){
        return BlackListToken.destroy({
          where: {
            exp: {
              [Op.lte]: new Date(),
            },
          },
        })
      }

}