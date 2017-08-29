import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import dotenv from 'dotenv'

import game from './app/models/Game'
import { getGames, postGame } from './app/routes/game'

dotenv.config()
const app = express()
const port = process.env.PORT || 8080
const mongoString= process.env.MONGO_STRING

//db connection
mongoose.Promise = global.Promise
mongoose.connect(mongoString)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))


//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(express.static(__dirname + '/client/dist'))

//cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

//API routes
app.route('/api/games')
    .get(getGames)
    .post(postGame)

app.route('*').get((req, res) => {
    res.sendFile('/client/dist/index.html')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
