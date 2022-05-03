import express from 'express'
import { AuthController } from '../controllers/auth'
import { PreguntaController } from '../controllers/Pregunta'


export const PreguntaRouter = express.Router()

PreguntaRouter.post('/random/:id', async (req, res) => {
    let id_area = req.params.id
    const user = req.body
    try {
        let pregunta = await PreguntaController.getRandomPregunta(user, id_area);
        if (pregunta != null) {
            res.status(200).json(pregunta)
        } else {
            res.status(500).send('No se encontro preguntas');
        }

    } catch (error) {
        console.log(error);

        res.status(500).json(error)
    }

})