import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import getConfig from './app/lib/config'
import game from './app/models/Game'
import user from './app/models/User'
import { auth, end } from './app/middlewares/auth'

import { login, signup, logout } from './app/routes/user'
import { getGames, postGame, deleteGame } from './app/routes/game'

const app = express()
const port = getConfig('SERVER_PORT')
const mongoString= getConfig('MONGO_STRING2')

//db connection
mongoose.Promise = global.Promise
mongoose.connect(mongoString)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))


//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use(express.static(__dirname + '/client/dist'))

// cors for development
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// User Routes
app.route('/auth/login')
    .post(login)

app.route('/auth/signup')
    .post(signup)

app.route('/auth/logout')
    .post(logout)

// API Routes
app.route('/api/games')
    .get(getGames)
    .post(auth, postGame)

app.route('/api/games/:id')
    .delete(auth, deleteGame)

app.route('*').get((req, res) => {
    res.sendFile('/client/dist/index.html')
})

//Listen
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
