import {Pregunta} from '../models/Pregunta'
import { Respuesta } from '../models/Respuesta'
import {sequelize} from "../sequelize"
import {UsuarioPreguntaController} from './Usuario_pregunta'

export const PreguntaController= {
    getPreguntabyPk(id_pregunta: string): Promise<Pregunta | null>{
        return Pregunta.findByPk(id_pregunta)
    },

    addPregunta(pregunta: Pregunta): Promise<Pregunta | null> {
        return Pregunta.create(pregunta);
    },

    async getRamdomPregunta(user: any,id_area:any): Promise<Pregunta | any>{
        let total_preguntas = await PreguntaController.countAll();
        let total_respuestas = await UsuarioPreguntaController.countAllUsuarioPregunta(user.id_usuario)

        if (total_preguntas===total_respuestas){
            await UsuarioPreguntaController.deleteUsuarioPregunta(user.id_usuario)
        }

        return Pregunta.findOne({
            include: [
                {
                    model: sequelize.models.Respuesta
                }
            ],
            order: sequelize.random(),
            where: {
                id_area
            },
        }).then(async res=>{
            if (res!=null){
                let contestada = await UsuarioPreguntaController.getByUsuarioPregunta(user.id_usuario,res.id_pregunta);
                if (contestada!=null){                    
                    let resultado = await this.getRamdomPregunta(user,id_area);
                    return resultado;
                }else{
                    UsuarioPreguntaController.addUsuarioPregunta({
                        id_usuario: user.id_usuario,
                        id_pregunta: res?.id_pregunta
                    })
                    return res
                }
            }else{
                return res
            }
        }).catch(err=>{
            return err
        })
    },

    countAll(): Promise<number>{
        return Pregunta.count();
    }
}