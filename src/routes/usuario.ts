import {UsuarioController} from '../controllers/usuario'
import express from 'express'

export const UsuarioRouter = express.Router()

UsuarioRouter.post('/add',async (req,res)=>{
    const user = req.body
    try{
        let result = await UsuarioController.addUser(user)
        res.status(200).json({
            data: result,
            ok: true
        })
    }catch(err){
        res.status(400).json(err);
    }
})

