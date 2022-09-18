import { UsuarioController } from '../controllers/Usuario'
import express from 'express'
import { Usuario } from '../models/Usuario'
import { Persona } from '../models/Persona'

export const UsuarioRouter = express.Router();

UsuarioRouter.post('/add', (req, res) => {
    const user = {
        email_us: req.body.email_us,
        pass_us: req.body.pass_us,
        id_rol: req.body.id_rol
    } as Usuario;

    const persona = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        fecha_nacimiento: new Date(req.body.fecha_nacimiento)
    } as Persona;

    UsuarioController.addUser(user, persona).then(resp => {
        res.status(200).json(resp)
    }, err => {

        const { detail } = err.parent
        if (detail) {
            if (detail.indexOf('Ya existe la llave (email_us)=') === 0) {
                res.status(500).send("Correo electrónico ya registrado")
                return;
            }
        }
        res.status(500).json(err.detail)
    })
})

