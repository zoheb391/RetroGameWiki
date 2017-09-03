import Game from '../models/Game'


export const getGames = (req, res) => {
    Game.find(null, null, { sort: { postDate: 1 } }, (err, games) => {
        res.json(games)
    })
}

export const postGame = (req, res) => {
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

export const deleteGame = (req, res) => {
    let gameId = req.params.id

    Game.remove({ _id: gameId})
        .then(response => res.send({ message: 'game deleted'}))
        .catch(e => res.send(e))

}
