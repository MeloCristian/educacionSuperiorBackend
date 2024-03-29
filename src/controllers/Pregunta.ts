import { Pregunta } from '../models/Pregunta'
export const PreguntaController = {
    getPreguntabyPk(id_pregunta: string): Promise<Pregunta | null> {
        return Pregunta.findByPk(id_pregunta)
    },

    addPregunta(pregunta: Pregunta): Promise<Pregunta | null> {
        return Pregunta.create(pregunta);
    },

    async getRandomPregunta(user: any, id_area: any): Promise<Pregunta | any> {
        let totalPreguntasArea = await PreguntaController.countAllPreguntasArea(id_area);
        let totalRespuestasArea = await UsuarioPreguntaController.countAllUsuarioPregunta(user.id_usuario, id_area)

        if (totalPreguntasArea === totalRespuestasArea) {
            await UsuarioPreguntaController.deleteUsuarioPreguntaArea(user.id_usuario, id_area)
        }

        return Pregunta.findOne({
            include: [
                {
                    model: Pregunta,
                }
            ],
            where: {
                id_area
            },
            order: sequelize.random(),
        }).then(async res => {
            if (res != null) {
                let contestada = await UsuarioPreguntaController.getByUsuarioPregunta(user.id_usuario, res.id_pregunta);
                if (contestada != null) {
                    let resultado = await this.getRandomPregunta(user, id_area);
                    return resultado;
                } else {
                    await UsuarioPreguntaController.addUsuarioPregunta({
                        id_usuario: user.id_usuario,
                        id_pregunta: res?.id_pregunta
                    })
                    return res
                }
            } else {
                return {
                    res,
                    ok: false,
                    sms: 'No existen preguntas para esta area'
                }
            }
        }).catch(err => {
            return err
        })
    },

    countAllPreguntasArea(id_area: number): Promise<number> {
        return Pregunta.count({
            where: {
                id_area
            }
        });
    }
}