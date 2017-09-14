import Game from '../models/Game'


export const getGames = (req, res) => {
    Game.find(null, null, { sort: { postDate: 1 } }, (err, games) => {
        if (games) res.json(games)
    })
    .catch(err => res.status(500).send({ message: 'server error getting games '}))
}

export const postGame = (req, res) => {
    let game = req.body

    Game.create( game, (err, result) => {
        if (err) {
            console.log('MONGOOSE ERROR', err)
            return res.status(500).send({message: err})
        }
        if (result) {
            return res.send({ message: 'game created' })
        }
    })
}

export const deleteGame = (req, res) => {
    let gameId = req.params.id

    Game.remove({ _id: gameId})
        .then(response => res.send({ message: 'game deleted'}))
        .catch(err => res.status(501).send(err))
}
