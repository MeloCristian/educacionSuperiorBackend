import express from 'express'
import { AuthController } from '../controllers/auth'
import { UsuarioRouter } from '../routes/usuario'
import { AreaRouter } from './area'
import { AuthRouter } from './auth'
import { PreguntaRouter } from './pregunta'

export const api = express.Router()

api.use('/user', UsuarioRouter)
api.use('/auth', AuthRouter)
api.use('/pregunta', AuthController.verificarToken, PreguntaRouter)
api.use('/area', AreaRouter)