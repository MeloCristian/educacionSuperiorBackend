import { UsuarioPregunta } from "../models/UsuarioPregunta";
import { Op } from "sequelize";
import { sequelize } from "../sequelize";

export const UsuarioPreguntaController = {
    getByUsuarioPregunta(
        id_usuario: number,
        id_pregunta: number
    ): Promise<UsuarioPregunta | null> {
        return UsuarioPregunta.findOne({
            where: {
                [Op.and]: [{ id_usuario }, { id_pregunta }],
            },
        });
    },

    countAllUsuarioPregunta(
        id_usuario: number,
        id_area: number
    ): Promise<number> {
        return UsuarioPregunta.count({
            include: {
                model: sequelize.models.Pregunta,
                where: {
                    id_area,
                },
            },
            where: {
                id_usuario,
            },
        });
    },

    addUsuarioPregunta(data: any): Promise<UsuarioPregunta> {
        return UsuarioPregunta.create(data);
    },

    async deleteUsuarioPreguntaArea(
        id_usuario: number,
        id_area: number
    ): Promise<number | any> {
        const t = await sequelize.transaction();
        try {
            const usuarioPreguntas = await UsuarioPregunta.findAll({
                attributes: ["id_usuario_pregunta"],
                include: {
                    model: sequelize.models.Pregunta,
                    where: {
                        id_area,
                    },
                },
                where: {
                    id_usuario,
                },
                transaction: t
            });
            if (usuarioPreguntas.length === 0) return Promise.resolve(true);
            for (let item of usuarioPreguntas) {
                let json = item.toJSON() as UsuarioPregunta;
                await UsuarioPregunta.destroy({
                    where: {
                        id_usuario_pregunta: json.id_usuario_pregunta
                    },
                    transaction: t
                })
            }
            await t.commit();
        } catch (error) {
            t.rollback();
        }

    },
};
