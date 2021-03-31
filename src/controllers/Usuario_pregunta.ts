import {Usuario_pregunta} from '../models/Usuario_pregunta'
import {Op} from 'sequelize'

export const UsuarioPreguntaController = {
    getByUsuarioPregunta(id_usuario: number,id_pregunta: number): Promise<Usuario_pregunta | null>{
        return Usuario_pregunta.findOne({
            where: {
                [Op.and]: [
                    {id_usuario},
                    {id_pregunta}
                ]
            }
        })
    },

    countAllUsuarioPregunta(id_usuario: number): Promise<number>{
        return Usuario_pregunta.count({
            where: {
                id_usuario
            }
        })
    },

    addUsuarioPregunta(data: any): Promise<Usuario_pregunta>{
        return Usuario_pregunta.create(data)
    },

    deleteUsuarioPregunta(id_usuario: number): Promise<number>{
        return Usuario_pregunta.destroy({
            where:{
                id_usuario
            }
        });
    }
}