import './env'
import  path from 'path'
import  crypto from 'crypto'
import  express from 'express'
import  bodyParser from 'body-parser'
import  cors from 'cors'
import  { api } from './src/routes'
import  { sequelize } from './src/sequelize'
import  cookieParser from 'cookie-parser'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser(crypto.randomBytes(16).toString('hex')))
app.use('/api', api)
app.use(express.static(path.resolve('public/')))
const port = process.env.PORT || 4500
//sequelize.sync({force: true}).then(() => {
sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`))
})