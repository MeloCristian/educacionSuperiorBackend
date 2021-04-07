import {UsuarioController} from '../controllers/usuario'
import express from 'express'

export const UsuarioRouter = express.Router()

UsuarioRouter.post('/add', (req,res)=>{
    const user = req.body
    UsuarioController.addUser(user).then(resp=>{
        res.status(200).json(resp)
    },err=>{
        
        const {detail} = err.parent
        if (detail){
            if(detail.indexOf('Ya existe la llave (email_us)=')===0){
                res.status(500).send("Correo electronico ya registrado")
                return;
            }
        }
        res.status(500).json(err)
    })
})

