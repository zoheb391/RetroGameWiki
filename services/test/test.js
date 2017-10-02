import { expect } from 'chai'
import mongoose from 'mongoose'

import User from '../app/models/User'

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done()
        })
    })
})
