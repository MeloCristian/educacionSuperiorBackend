import express from 'express'
import {UsuarioRouter} from '../routes/usuario'
import { AuthRouter } from './auth'
import { PreguntaRouter } from './Pregunta'

export const api = express.Router()

api.use('/user',UsuarioRouter)
api.use('/auth',AuthRouter)
api.use('/pregunta',PreguntaRouter)