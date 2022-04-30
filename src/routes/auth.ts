import express from 'express'
import {AuthController} from '../controllers/auth'

export const AuthRouter = express.Router();

AuthRouter.post('/sigin',async (req, res)=>{
    const {email_us,pass_us} =req.body;
    try {
        let resp = await AuthController.sigin({email_us,pass_us});
        
        
        if (resp!=null){
            res.status(200).json(
                resp
            )
        }else{
            res.status(500).send('Error')
        }
    } catch (error) { 
        res.status(500).json(error)
    }
})

AuthRouter.get('/verifica_sesion',AuthController.verificaSesion)