import Game from '../models/Game'


const getGames = (req, res) => {
    Game.find(null, null, { sort: { postDate: 1 } }, (err, games) => {
        res.json(games)
    })
}

const postGame = (req, res) => {
    let game = req.body

    Game.create( game, (err, result) => {
        if (err) {
            console.log('MONGOOSE ERROR', err)
            res.send(err)
        } else {
            console.log('game created')
            res.send({ message: 'game created' })
        }
    })

}


export { getGames, postGame }
