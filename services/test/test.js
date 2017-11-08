import { expect } from 'chai'
import mongoose from 'mongoose'
//
import Game from '../app/models/Game'

describe('Game', () => {
    describe('Games API', () => {
        it('should return games', (done) => {
            // console.log(Game)
            Game.find(null, null, { sort: { postDate: 1 } }, (err, games) => {
                if (games) {
                    console.log(games)
                    done()
                }
                if (err) {
                    console.log(err)
                    throw errw
                    done()
                }
            })
        })
    })
})
