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
import auth from './app/middlewares/auth'

import { login, signup, logout } from './app/routes/user'
import { getGames, postGame, deleteGame } from './app/routes/game'

const app = express()
const port = getConfig('PORT')
const mongoString= getConfig('MONGO_STRING')

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

//cors for development
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next()
// })

// User Routes
app.route('/auth/login')
    .post(login)

app.route('/auth/signup')
    .post(signup)

app.route('/auth/logout')
    .post(logout)

app.route('/test')
    .post(auth)
    
// API Routes
app.route('/api/games')
    .get(getGames)
    .post(auth, postGame)

app.route('/api/games/:id')
    .delete(auth, deleteGame)

app.route('*').get((req, res) => {
    res.sendFile('/client/dist/index.html')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
