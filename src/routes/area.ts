import express from 'express'
import { AreaController } from '../controllers/Area'


export const AreaRouter = express.Router()

AreaRouter.get('', async (req, res) => {
    try {
        let area = await AreaController.getAll();
        if (area != null) {
            res.status(200).json(area)
        } else {
            res.status(500).send('No se encontraron areas');
        }

    } catch (error) {
        res.status(500).json(error)
    }

})